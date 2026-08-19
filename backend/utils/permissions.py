from rest_framework.permissions import BasePermission
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
            (request.user.role in [UserRole.SYSTEM_ADMIN, UserRole.DEPARTMENT_ADMIN] or request.user.is_superuser)
        )