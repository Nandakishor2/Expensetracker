from Exceptions.Base import ExpenseTrackerException

class DatabaseException(ExpenseTrackerException):
    status_code = 500


class DatabaseConnectionException(DatabaseException):
    status_code = 503


class DuplicateKeyException(DatabaseException):
    status_code = 409


class DatabaseWriteException(DatabaseException):
    status_code = 500


class DatabaseReadException(DatabaseException):
    status_code = 500


class DatabaseUpdateException(DatabaseException):
    status_code = 500


class DatabaseDeleteException(DatabaseException):
    status_code = 500

class DatabaseConnectionError(DatabaseException):
    status_code = 503

class DatabaseServerSelectionTimeoutException(DatabaseException):
    status_code = 503