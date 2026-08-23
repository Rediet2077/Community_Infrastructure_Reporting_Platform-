from rest_framework.permissions import BasePermission, SAFE_METHODS
from utils.enums import UserRole


class IsCitizen(BasePermission):
    """
    Allows access only to authenticated users with the CITIZEN role.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == UserRole.CITIZEN
        )


class IsFieldWorker(BasePermission):
    """
    Allows access only to authenticated users with the FIELD_WORKER role.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == UserRole.FIELD_WORKER
        )


class IsDepartmentAdmin(BasePermission):
    """
    Allows access only to authenticated users with the DEPARTMENT_ADMIN role.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == UserRole.DEPARTMENT_ADMIN
        )


class IsSystemAdmin(BasePermission):
    """
    Allows access only to authenticated users with the SYSTEM_ADMIN role
    or Django superuser status.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role == UserRole.SYSTEM_ADMIN or request.user.is_superuser)
        )


class IsAdminOrDepartmentAdmin(BasePermission):
    """
    Allows access to either System Admins or Department Admins.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (
                request.user.role in [UserRole.SYSTEM_ADMIN, UserRole.DEPARTMENT_ADMIN] or
                request.user.is_superuser
            )
        )


class IsOwnerOrAdmin(BasePermission):
    """
    Object-level permission:
    - Allows read access (GET, HEAD, OPTIONS) to authenticated users.
    - Allows write access (PUT, PATCH, DELETE) ONLY if the user is the owner
      of the object OR a System Admin / Superuser.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        # 1. System Admins and Superusers bypass ownership checks
        if request.user.role == UserRole.SYSTEM_ADMIN or request.user.is_superuser:
            return True

        # 2. Safe read-only HTTP methods (GET, HEAD, OPTIONS) are allowed
        if request.method in SAFE_METHODS:
            return True

        # 3. Dynamic ownership checking across CIRP entity schemas
        if hasattr(obj, 'user'):
            return obj.user == request.user
        elif hasattr(obj, 'created_by'):
            return obj.created_by == request.user
        elif hasattr(obj, 'citizen'):
            return obj.citizen == request.user

        return False