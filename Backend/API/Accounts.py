from fastapi import APIRouter
from Responses.Account import CreateAccountResponse,GetAccountDetailsResponse,UpdateAccountResponse,DeleteAccountResponse
from fastapi.responses import JSONResponse
from Models.Accounts import Account,UpdateAccount
from Services.Accounts import handleInsertAccountDetails,handleGetAccountDetails,handleUpdateAccountDetails,handleDeleteAccountDetails
accountRouter = APIRouter(prefix="/accounts",tags=["Accounts"])

@accountRouter.post("/create")
async def createAccount(accountDetails : Account):
    response : CreateAccountResponse = await handleInsertAccountDetails(accountDetails)
    return JSONResponse(
        status_code = response.status_code,
        content = response.model_dump(exclude_unset=True,exclude_none=True,exclude_defaults=True)
    )

@accountRouter.patch("/update/{accountID}")
def updateAccount(accountID : str, accountDetails : UpdateAccount):
    response : UpdateAccountResponse = handleUpdateAccountDetails(accountID,accountDetails)
    return JSONResponse(
        status_code = response.statusCode,
        content = response.model_dump(exclude_unset=True,exclude_none=True,exclude_defaults=True)
    )

@accountRouter.delete("/delete/{accountID}")
def deleteAccount(accountID : str):
    response : DeleteAccountResponse = handleDeleteAccountDetails(accountID)
    return JSONResponse(
        status_code = response.statusCode,
        content = response.model_dump(exclude_unset=True,exclude_none=True,exclude_defaults=True)
    )

@accountRouter.get("/")
async def getAccountDetails():
    response : GetAccountDetailsResponse = await handleGetAccountDetails()
    return JSONResponse(
        status_code = response.status_code,
        content = response.model_dump(exclude_unset=True,exclude_none=True,exclude_defaults=True)
    )