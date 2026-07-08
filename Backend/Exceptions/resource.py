
from .base import ExpenseTrackerException

class ResourceNotFoundException(ExpenseTrackerException):
    status_code = 404


class ResourceAlreadyExistsException(ExpenseTrackerException):
    status_code = 409