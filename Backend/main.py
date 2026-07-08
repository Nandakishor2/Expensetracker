from fastapi import FastAPI
from Exceptions.handlers import expenseExceptionHandler,genericExceptionHandler
from Exceptions.Base import ExpenseTrackerException
app = FastAPI()

app.add_exception_handler(ExpenseTrackerException , expenseExceptionHandler)
app.add_exception_handler(Exception , genericExceptionHandler)

@app.get("/")
def default():
    return{
        "message" : "Welcome to Expense Tracker"
    }
    
@app.get("/healthCheck")
def healthCheck():
    return{
        "status" : "OK"
    }
