from Database.Accounts import inserAccountDetails,updateAccountDetails,deleteAccountDetails,getAccountDetails
from Models.Accounts import Account
from Responses.Account import CreateAccountResponse
from Schema.Accounts import AccountSchema

def handleInsertAccountDetails(accountDetails : Account) -> CreateAccountResponse:
    newAccountDetails : AccountSchema = AccountSchema(**accountDetails.model_dump())
    newAccountID : str = inserAccountDetails(newAccountDetails)
    return CreateAccountResponse(
        message = "New Account created successfully",
        accountID = newAccountID
    )

def handleUpdateAccountDetails():
    pass

def handleDeleteAccountDetails():
    pass

def handleGetAccountDetails():
    pass