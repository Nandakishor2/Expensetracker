from Responses.Loans import CreateNewLoanResponse,GetLoanDetailsResponse
from Database.Loans import getAllLoanDetails,insertLoanDetails
from Models.Loans import Loans
from Schema.Loans import LoanSchema
def handleGetAllLoans() -> GetLoanDetailsResponse:
    loanDetails : list[dict] = getAllLoanDetails()
    return GetLoanDetailsResponse(
        statusCode = 200,
        message = "Loan details fetched successfully",
        loanDetailsList = [Loans(**loan) for loan in loanDetails] 
    )

def handleCreateLoanDetails(loanDetails : Loans) -> CreateNewLoanResponse:
    newLoanSchema : LoanSchema = LoanSchema(
        **loanDetails.model_dump()
    )
    newLoanID : str = insertLoanDetails(newLoanSchema)
    return CreateNewLoanResponse(
        statusCode = 200,
        message = "Loan created successfully",
        loanID = newLoanID
    )