from rest_framework.response import Response
from rest_framework import status


def success_response(data=None, message="Success", status_code=status.HTTP_200_OK):
    """
    Standard envelope for successful API responses.
    """
    payload = {
        "success": True,
        "message": message,
        "data": data if data is not None else {}
    }
    return Response(payload, status=status_code)


def error_response(message="An error occurred", errors=None, status_code=status.HTTP_400_BAD_REQUEST):
    """
    Standard envelope for failed API responses.
    """
    payload = {
        "success": False,
        "message": message,
        "errors": errors if errors is not None else {}
    }
    return Response(payload, status=status_code)