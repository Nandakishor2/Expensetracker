from Exceptions.Base import ExpenseTrackerException
from fastapi.responses import JSONResponse
import logging

def expenseExceptionHandler(request, exec : ExpenseTrackerException):
    logging.exception(f"Expence Exception occoured : {exec.message}")
    return JSONResponse(
        status_code=exec.status_code,
        content={
            "message" : exec.message
        }
    )

def genericExceptionHandler(request,exec : Exception):
    logging.exception(f"Generic Exception occoured : {str(exec)}")
    return JSONResponse(
        status_code=500,
        content={
            "message" : "Something went wrong. Please try again"
        }
    )