from Responses.Loans import CreateNewLoanResponse,GetLoanDetailsResponse,UpdateLoanDetailsResponse,DeleteLoanDetailsResponse
from Database.Loans import getAllLoanDetails,insertLoanDetails,findLoanDetails,updateLoanDetails,deleteLoanDetails
from Models.Loans import Loans,UpdateLoan
from Schema.Loans import LoanSchema
async def handleGetAllLoans() -> GetLoanDetailsResponse:
    loanDetails : list[dict] = await getAllLoanDetails()
    return GetLoanDetailsResponse(
        statusCode = 200,
        message = "Loan details fetched successfully",
        loanDetailsList = [Loans(**loan) for loan in loanDetails] 
    )

async def handleGetLoanDetails(loanID : str) -> GetLoanDetailsResponse:
    loanDetails : dict = await findLoanDetails(loanID)
    return GetLoanDetailsResponse(
        statusCode = 200,
        message = "Loan details fetched successfully",
        loanDetails = Loans(**loanDetails)
    )

async def handleCreateLoanDetails(loanDetails : Loans) -> CreateNewLoanResponse:
    newLoanSchema : LoanSchema = LoanSchema(
        **loanDetails.model_dump()
    )
    newLoanID : str = await insertLoanDetails(newLoanSchema)
    return CreateNewLoanResponse(
        statusCode = 200,
        message = "Loan created successfully",
        loanID = newLoanID
    )

async def handleUpdateLoanDetails(loanID : str, loanDetails : UpdateLoan) -> UpdateLoanDetailsResponse:
    updatedLoanDetails : dict = await updateLoanDetails(loanID=loanID,loanDetails= loanDetails)
    return UpdateLoanDetailsResponse(
        statusCode = 200,
        message = "Loan updated successfully",
        loanDetails = Loans(**updatedLoanDetails)
    )

async def handleDeleteLoanDetails(loanID : str) -> DeleteLoanDetailsResponse:
    await deleteLoanDetails(loanID)
    return DeleteLoanDetailsResponse(
        statusCode = 200,
        message = "Loan deleted successfully",
        loanDeleted = True
    )