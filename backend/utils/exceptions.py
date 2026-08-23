from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException


def custom_exception_handler(exc, context):
    """
    Global custom exception handler to guarantee all DRF exceptions
    follow the CIRP standard response envelope.
    """
    response = exception_handler(exc, context)

    if response is not None:
        message = "Validation or client error"
        errors = response.data

        # If DRF returns a detailed error string directly (e.g. AuthenticationFailed)
        if isinstance(errors, dict) and "detail" in errors:
            message = str(errors["detail"])
            errors = {}
        elif isinstance(errors, list):
            message = "Multiple errors occurred"

        custom_payload = {
            "success": False,
            "message": message,
            "errors": errors
        }
        return Response(custom_payload, status=response.status_code)

    # Handle unhandled server exceptions (HTTP 500)
    return Response(
        {
            "success": False,
            "message": "An internal server error occurred.",
            "errors": {}
        },
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )