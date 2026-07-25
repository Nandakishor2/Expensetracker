from fastapi import APIRouter
from Services.CreditHistory import handleCreateCreditHistory,handleDeleteCreditHistory,handleFindCreditHistory,handleGetCreditHistory,handleUpdateCreditHistory
from Models.CreditHistory import CreditHistory,CreateCreditHistory,UpdateCreditHistory
from fastapi.responses import JSONResponse

from Responses.CreditHistory import CreateCreditHistoryResponse,UpdateCreditHistoryResponse,DeleteCreditHistoryResponse,GetCreditHistoryResponse

creditHistoryRouter = APIRouter(prefix="/creditHistory",tags=["Credit History"])

@creditHistoryRouter.get("/")
async def getCreditHistory():
    response : GetCreditHistoryResponse= await handleGetCreditHistory()
    return JSONResponse(status_code=response.statusCode,content=response.model_dump(exclude_none=True,mode="json"))


@creditHistoryRouter.get("/{creditHistoryID}")
async def findCreditHistory(creditHistoryID:str):
    response : GetCreditHistoryResponse= await handleFindCreditHistory(creditHistoryID)
    return JSONResponse(status_code=response.statusCode,content=response.model_dump(exclude_none=True,mode="json"))


@creditHistoryRouter.post("/")
async def createCreditHistory(request: CreateCreditHistory):
    response : CreateCreditHistoryResponse= await handleCreateCreditHistory(request)
    return JSONResponse(status_code=response.statusCode,content=response.model_dump(mode="json"))

@creditHistoryRouter.put("/{creditHistoryID}")
async def updateCreditHistory(creditHistoryID:str,request: UpdateCreditHistory):
    response : UpdateCreditHistoryResponse= await handleUpdateCreditHistory(creditHistoryID,request)
    return JSONResponse(status_code=response.statusCode,content=response.model_dump(mode="json"))

@creditHistoryRouter.delete("/{creditHistoryID}")
async def deleteCreditHistory(creditHistoryID:str):
    response : DeleteCreditHistoryResponse= await handleDeleteCreditHistory(creditHistoryID)
    return JSONResponse(status_code=response.statusCode,content=response.model_dump())
