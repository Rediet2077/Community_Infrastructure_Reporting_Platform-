from rest_framework import permissions


class IsDepartmentManagerOrAdmin(permissions.BasePermission):
    """
    Custom permission to allow full access only to Admins or Department Managers.
    Other authenticated users get read-only (GET, HEAD, OPTIONS) access.
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        # Read permissions are allowed to any authenticated request
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are restricted to admin or manager roles
        user_role = getattr(request.user, 'role', None)
        return request.user.is_staff or user_role in ['ADMIN', 'DEPARTMENT_MANAGER']


class IsAssignedContractorOrManager(permissions.BasePermission):
    """
    Object-level permission to allow updates only if the user is the contractor 
    assigned to the task or a managing authority.
    """

    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False

        # Read-only access is allowed for safe HTTP methods
        if request.method in permissions.SAFE_METHODS:
            return True

        user_role = getattr(request.user, 'role', None)

        # Admins and Managers have global write access
        if request.user.is_staff or user_role in ['ADMIN', 'DEPARTMENT_MANAGER']:
            return True

        # Contractors can only update tasks explicitly assigned to them
        if hasattr(obj, 'assigned_contractor'):
            return obj.assigned_contractor == request.user

        return False