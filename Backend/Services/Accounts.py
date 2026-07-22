from Database.Accounts import inserAccountDetails,updateAccountDetails,deleteAccountDetails,getAllAccountDetails
from Models.Accounts import Account,UpdateAccount
from Responses.Account import CreateAccountResponse,GetAccountDetailsResponse,UpdateAccountResponse,DeleteAccountResponse
from Schema.Accounts import AccountSchema

async def handleInsertAccountDetails(accountDetails : Account) -> CreateAccountResponse:
    newAccountDetails : AccountSchema = AccountSchema(**accountDetails.model_dump())
    newAccountID : str = await inserAccountDetails(newAccountDetails)
    return CreateAccountResponse(
        statusCode = 200,
        message = "New Account created successfully",
        accountID = newAccountID,
        )

def handleUpdateAccountDetails(accountID : str,accountDetails : UpdateAccount) -> UpdateAccountResponse:
    updatedAccountDetails : dict = updateAccountDetails(accountID,accountDetails)

    return UpdateAccountResponse(
        statusCode = 200,
        message = "Account Details updated successfully",
        updatedAccountDetails = Account(**updatedAccountDetails),
    )

def handleDeleteAccountDetails(accountID : str):
    deletedAccountStaus : dict = deleteAccountDetails(accountID)
    return DeleteAccountResponse(
        statusCode = 200,
        message = "Account details deleted successfully."
    )

async def handleGetAccountDetails():
    accountDetailsList : list[dict] = await getAllAccountDetails()

    return GetAccountDetailsResponse(
        statusCode = 201,
        message = "Account Details fetched Successfully.",
        accountDetailsList = [
            Account(**account)
            for account in accountDetailsList
        ]
    )

