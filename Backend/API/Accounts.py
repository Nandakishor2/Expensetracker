from fastapi import APIRouter
from Responses.Account import CreateAccountResponse
from fastapi.responses import JSONResponse
from Models.Accounts import Account
from Services.Accounts import handleInsertAccountDetails
accountRouter = APIRouter(prefix="/accounts",tags=["Accounts"])

@accountRouter.post("/create")
def createAccount(accountDetails : Account):
    response : CreateAccountResponse = handleInsertAccountDetails(accountDetails)
    return JSONResponse(
        status_code = 200,
        content = response.model_dump()
    )