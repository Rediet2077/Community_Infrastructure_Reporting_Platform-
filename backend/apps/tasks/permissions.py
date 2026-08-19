from rest_framework import permissions

class IsDepartmentAdmin(permissions.BasePermission):
    """
    Allows access only to users with the DEPARTMENT_ADMIN role.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            getattr(request.user, 'role', None) == 'DEPARTMENT_ADMIN'
        )


class IsTaskDepartmentAdmin(permissions.BasePermission):
    """
    Ensures department admins only modify tasks belonging to their own department.
    """
    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False

        if request.user.role == 'SYSTEM_ADMIN':
            return True

        if hasattr(request.user, 'managed_department'):
            return obj.department == request.user.managed_department

        return False