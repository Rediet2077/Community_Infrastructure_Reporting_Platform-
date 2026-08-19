from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.tasks.models import Task
from apps.notifications.services import create_notification


class Command(BaseCommand):
    help = "Checks for tasks past their current_deadline and marks them as OVERDUE while notifying managers."

    def handle(self, *args, **options):
        now = timezone.now()

        # Query active tasks that have passed their deadline and are not yet completed, resolved, or overdue
        overdue_tasks = Task.objects.filter(
            current_deadline__lt=now
        ).exclude(
            status__in=[
                Task.Status.COMPLETED_PENDING_VERIFICATION,
                Task.Status.VERIFIED_COMPLETED,
                Task.Status.OVERDUE,
                Task.Status.CANCELLED,
            ]
        )

        updated_count = 0

        for task in overdue_tasks:
            # Update task status
            task.status = Task.Status.OVERDUE
            task.save(update_fields=['status', 'updated_at'])
            updated_count += 1

            # Notify assigned contractor/worker if exists
            if getattr(task, 'assigned_contractor', None):
                create_notification(
                    recipient=task.assigned_contractor,
                    title=f"Task Overdue: {task.title}",
                    message=f"The deadline ({task.current_deadline.strftime('%Y-%m-%d')}) for task '{task.title}' has passed. Please submit an extension or completion update.",
                    notification_type='TASK_OVERDUE',
                    related_object_id=task.id,
                )

            # Notify department manager if exists
            if hasattr(task, 'department') and task.department:
                dept_manager = getattr(task.department, 'manager', None)
                if dept_manager:
                    create_notification(
                        recipient=dept_manager,
                        title=f"Department Alert: Overdue Task in {task.department.name}",
                        message=f"Task '{task.title}' has missed its deadline ({task.current_deadline.strftime('%Y-%m-%d')}).",
                        notification_type='TASK_OVERDUE',
                        related_object_id=task.id,
                    )

        self.stdout.write(
            self.style.SUCCESS(f"Successfully processed {updated_count} overdue task(s) at {now.isoformat()}.")
        )