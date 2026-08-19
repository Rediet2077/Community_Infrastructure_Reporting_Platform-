from rest_framework import permissions

class IsDepartmentAdmin(permissions.BasePermission):
    """
    Allows access only to users with the DEPARTMENT_ADMIN role.
    """
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'DEPARTMENT_ADMIN'
        )

class IsTaskDepartmentAdmin(permissions.BasePermission):
    """
    Ensures that a department admin can only manage tasks assigned to their own department.
    """
    def has_object_permission(self, request, view, obj):
        if not (request.user and request.user.is_authenticated):
            return False
        
        # System admins can access everything
        if request.user.role == 'SYSTEM_ADMIN':
            return True
            
        # Department admins can only access tasks belonging to their department
        if hasattr(request.user, 'managed_department'):
            return obj.department == request.user.managed_department
            
        return False