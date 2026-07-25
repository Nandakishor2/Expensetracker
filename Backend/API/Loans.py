from fastapi import APIRouter
from fastapi.responses import JSONResponse
from Responses.Loans import GetLoanDetailsResponse,CreateNewLoanResponse
from Services.Loans import handleGetAllLoans,handleCreateLoanDetails,handleDeleteLoanDetails,handleGetLoanDetails,handleUpdateLoanDetails
from Models.Loans import Loans,UpdateLoan

loanRouter = APIRouter(prefix="/loans",tags=["Loans"])

@loanRouter.get("/")
async def getLoanDetails():
    response : GetLoanDetailsResponse = await handleGetAllLoans()
    return JSONResponse(
        status_code = response.statusCode,
        content = response.model_dump(exclude_unset=True,exclude_none=True,mode="json"),
        
    )

@loanRouter.post("/")
async def createLoanDetails(loanDetails : Loans ):
    response : CreateNewLoanResponse = await handleCreateLoanDetails(loanDetails)
    return JSONResponse(
        status_code = response.statusCode,
        content = response.model_dump(exclude_unset=True,exclude_none=True)
    )

@loanRouter.get("/{loanID}")
async def getLoanDetails(loanID : str):
    response : GetLoanDetailsResponse = await handleGetLoanDetails(loanID)
    return JSONResponse(
        status_code = response.statusCode,
        content = response.model_dump(exclude_unset=True,exclude_none=True,mode="json"),
        
    )

@loanRouter.put("/{loanID}")
async def updateLoanDetails(loanID : str, loanDetails : UpdateLoan):
    response : UpdateLoanDetailsResponse = await handleUpdateLoanDetails(loanID,loanDetails)
    return JSONResponse(
        status_code = response.statusCode,
        content = response.model_dump(mode="json",exclude_unset=True,exclude_none=True)
    )

@loanRouter.delete("/{loanID}")
async def deleteLoanDetails(loanID : str):
    response : DeleteLoanDetailsResponse = await handleDeleteLoanDetails(loanID)
    return JSONResponse(
        status_code = response.statusCode,
        content = response.model_dump(exclude_unset=True,exclude_none=True)
    )