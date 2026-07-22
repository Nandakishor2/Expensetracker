from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Exceptions.handlers import expenseExceptionHandler,genericExceptionHandler
from Exceptions.Base import ExpenseTrackerException
from API.Accounts import accountRouter
from API.People import peopleRouter

from Connections.MongoDB import checkConnection
from API.Loans import loanRouter
app = FastAPI()

app.add_exception_handler(ExpenseTrackerException , expenseExceptionHandler)
app.add_exception_handler(Exception , genericExceptionHandler)

orgins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = orgins,
    allow_methods = ["*"],
    allow_headers = ["*"],
    allow_credentials = True,
)


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

app.include_router(accountRouter)
app.include_router(peopleRouter)
app.include_router(loanRouter)