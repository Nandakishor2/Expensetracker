from Responses.Bills import CreateBillResponse, GetBillResponse, UpdateBillResponse, DeleteBillResponse
from Services.Bills import handleCreateBill, handleDeleteBill, handleGetBill, handleGetBillList, handleUpdateBill
from Models.Bills import CreateBills, UpdateBills
from fastapi.responses import JSONResponse
from fastapi.routing import APIRouter

billRouter = APIRouter(prefix="/Bills",tags=["Bills"])

@billRouter.get("/")
async def getBillList():
    response : GetBillResponse = await handleGetBillList()
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_defaults=True,exclude_none=True,exclude_unset=True)
    )

@billRouter.get("/{billID}")
async def getBillDetails(billID:str):
    response : GetBillResponse = await handleGetBill(billID)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_defaults=True,exclude_none=True,exclude_unset=True)
    )

@billRouter.post("/")
async def createBill(bill:CreateBills):
    response : CreateBillResponse = await handleCreateBill(bill)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_defaults=True,exclude_none=True,exclude_unset=True)
    )

@billRouter.put("/{billID}")
async def updateBill(billID:str,bill:UpdateBills):
    response : UpdateBillResponse = await handleUpdateBill(billID,bill)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_defaults=True,exclude_none=True,exclude_unset=True)
    )

@billRouter.delete("/{billID}")
async def deleteBill(billID:str):
    response : DeleteBillResponse = await handleDeleteBill(billID)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_defaults=True,exclude_none=True,exclude_unset=True)
    )
