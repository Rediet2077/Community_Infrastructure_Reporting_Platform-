from apps.audit.models import AuditLog


def get_client_ip(request):
    """
    Extract client IP address from HTTP request headers.
    """
    if not request:
        return None
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def get_user_agent(request):
    """
    Extract User-Agent string from HTTP request headers.
    """
    if not request:
        return None
    return request.META.get('HTTP_USER_AGENT', '')[:500]


def record_audit_log(
    action: str,
    entity_type: str,
    entity_id=None,
    actor=None,
    request=None,
    old_values: dict = None,
    new_values: dict = None,
    reason: str = None,
):
    """
    Central helper function to create an immutable audit record.
    """
    ip_address = get_client_ip(request) if request else None
    user_agent = get_user_agent(request) if request else None

    # If actor is not passed explicitly but request is available
    if not actor and request and hasattr(request, 'user') and request.user.is_authenticated:
        actor = request.user

    return AuditLog.objects.create(
        user=actor,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        old_values=old_values,
        new_values=new_values,
        reason=reason,
        ip_address=ip_address,
        user_agent=user_agent,
    )