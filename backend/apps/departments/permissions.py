from rest_framework import permissions


class IsDepartmentAdmin(permissions.BasePermission):
    """
    Allows write/manage access to users with administrative roles.
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False

        user_role = getattr(request.user, 'role', None)
        # Check both role variations and staff status
        return request.user.is_staff or user_role in ['SYSTEM_ADMIN', 'ADMIN', 'DEPARTMENT_ADMIN', 'DEPARTMENT_MANAGER']


class IsTaskDepartmentAdmin(permissions.BasePermission):
    """
    Ensures a department admin can only manage tasks assigned to their department.
    """
    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False

        user_role = getattr(request.user, 'role', None)

        # System admins and superusers have unrestricted access
        if request.user.is_staff or user_role in ['SYSTEM_ADMIN', 'ADMIN']:
            return True

        # Check department ownership (handles both managed_department and department field names)
        user_dept = getattr(request.user, 'managed_department', None) or getattr(request.user, 'department', None)
        
        if user_dept and hasattr(obj, 'department'):
            return obj.department == user_dept

        return False