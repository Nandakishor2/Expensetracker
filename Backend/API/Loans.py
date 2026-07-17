from fastapi import APIRouter
from fastapi.responses import JSONResponse
from Responses.Loans import GetLoanDetailsResponse,CreateNewLoanResponse
from Services.Loans import handleGetAllLoans,handleCreateLoanDetails
from Models.Loans import Loans

loanRouter = APIRouter(prefix="/loans",tags=["Loans"])

@loanRouter.get("/")
def getLoanDetails():
    response : GetLoanDetailsResponse = handleGetAllLoans()
    return JSONResponse(
        status_code = response.statusCode,
        content = response.model_dump(exclude_unset=True,exclude_none=True,mode="json"),
        
    )

@loanRouter.post("/")
def createLoanDetails(loanDetails : Loans ):
    response : CreateNewLoanResponse = handleCreateLoanDetails(loanDetails)
    return JSONResponse(
        status_code = response.statusCode,
        content = response.model_dump(exclude_unset=True,exclude_none=True)
    )