from Responses.IncomeSource import CreateIncomeSourceResponse,GetIncomeSourceResponse,UpdateIncomeSourceResponse,DeleteIncomeSourceResponse

from Services.IncomeSource import handleCreateIncomeSource,handleDeleteIncomeSource,handleGetIncomeSource,handleGetIncomeSourceList,handleUpdateIncomeSource

from Models.IncomeSource import CreateIncomeSource,UpdateIncomeSource

from fastapi.responses import JSONResponse
from fastapi.routing import APIRouter

incomeSourceRouter = APIRouter(prefix="/IncomeSource",tags=["Income Sources"])

@incomeSourceRouter.get("/")
async def getIncomeSourceList():
    response : GetIncomeSourceResponse = await handleGetIncomeSourceList()
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_defaults=True,exclude_none=True,exclude_unset= True,mode="json")
    )

@incomeSourceRouter.get("/{incomeSourceID}")
async def getIncomeSourceDetails(incomeSourceID:str):
    response : GetIncomeSourceResponse = await handleGetIncomeSource(incomeSourceID)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_defaults=True,exclude_none=True,exclude_unset=True,mode="json")
    )

@incomeSourceRouter.post("/")
async def createIncomeSource(incomeSource:CreateIncomeSource):
    response : CreateIncomeSourceResponse = await handleCreateIncomeSource(incomeSource)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_defaults=True,exclude_none=True,exclude_unset=True)
    )

@incomeSourceRouter.put("/{incomeSourceID}")
async def updateIncomeSource(incomeSourceID:str,incomeSource:UpdateIncomeSource):
    response : UpdateIncomeSourceResponse = await handleUpdateIncomeSource(incomeSourceID,incomeSource)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_defaults=True,exclude_none=True,exclude_unset=True,mode="json")
    )

@incomeSourceRouter.delete("/{incomeSourceID}")
async def deleteIncomeSource(incomeSourceID:str):
    response : DeleteIncomeSourceResponse = await handleDeleteIncomeSource(incomeSourceID)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_defaults=True,exclude_none=True,exclude_unset=True)
    )

