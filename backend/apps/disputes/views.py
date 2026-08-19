from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Dispute
from .serializers import DisputeSerializer, DisputeCommentSerializer
from .services import raise_dispute, resolve_dispute, add_dispute_comment


class DisputeViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing department tasks and operational disputes.
    """
    queryset = Dispute.objects.select_related(
        'raised_by', 'department', 'task', 'resolved_by'
    ).prefetch_related('comments').all()
    serializer_class = DisputeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        user_role = getattr(user, 'role', None)

        # System admins see all disputes
        if user.is_staff or user_role in ['SYSTEM_ADMIN', 'ADMIN']:
            return self.queryset

        # Department managers see disputes assigned to their department
        user_dept = getattr(user, 'managed_department', None) or getattr(user, 'department', None)
        if user_dept:
            return self.queryset.filter(department=user_dept) | self.queryset.filter(raised_by=user)

        # Users see disputes they personally raised
        return self.queryset.filter(raised_by=user)

    def perform_create(self, serializer):
        serializer.save(raised_by=self.request.user)

    @action(detail=True, methods=['post'], url_path='resolve')
    def resolve(self, request, pk=None):
        """
        POST /api/disputes/{id}/resolve/
        Resolves or closes an open dispute.
        Body: {"resolution_notes": "Issue reviewed and scope updated.", "status": "RESOLVED"}
        """
        resolution_notes = request.data.get('resolution_notes', '')
        new_status = request.data.get('status', 'RESOLVED')

        if not resolution_notes:
            return Response(
                {"error": "'resolution_notes' field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            dispute = resolve_dispute(
                dispute_id=pk,
                resolved_by_user=request.user,
                resolution_notes=resolution_notes,
                new_status=new_status,
            )
            serializer = self.get_serializer(dispute)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='add-comment')
    def add_comment(self, request, pk=None):
        """
        POST /api/disputes/{id}/add-comment/
        Adds a comment or update to a dispute discussion.
        Body: {"comment": "Additional documentation submitted."}
        """
        comment_text = request.data.get('comment', '')

        try:
            comment_obj = add_dispute_comment(
                dispute_id=pk,
                author_user=request.user,
                comment_text=comment_text,
            )
            serializer = DisputeCommentSerializer(comment_obj)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)