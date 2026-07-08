
class ExpenseTrackerException(Exception):
    status_code = 500
    def __init__(self, message : str = "Some unknown error occoured"):
        super().__init__(message)
        self.message = message


