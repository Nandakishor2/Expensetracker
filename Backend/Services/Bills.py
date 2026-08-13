from Database.Bills import addNewBill, getBill, getBillList, updateBill, deleteBill
from Responses.Bills import CreateBillResponse, GetBillResponse, UpdateBillResponse, DeleteBillResponse
from Models.Bills import Bill, CreateBills, UpdateBills
from Schema.Bills import BillSchema
from Utils.GenerateUUID import generateUUID


async def handleCreateBill(createBill : CreateBills) -> CreateBillResponse:
    billSchema : BillSchema = BillSchema(**createBill.model_dump(),
        billID= generateUUID()
    )
    result : str = await addNewBill(billSchema)    
    return CreateBillResponse(
        billID = result,
        statusCode = 200,
        message = "Bill created successfully",
    )

async def handleGetBill(billID : str) -> GetBillResponse:
    result : dict = await getBill(billID)
    return GetBillResponse(
        statusCode = 200,
        message = "Bill fetched successfully",
        bill = Bill(**result)
    )

async def handleGetBillList() -> GetBillResponse:
    result : list[dict] = await getBillList()
    return GetBillResponse(
        statusCode = 200,
        message = "Bill list fetched successfully",
        billList = [Bill(**bill) for bill in result]
    )

async def handleUpdateBill(billID : str, updateBillData : UpdateBills) -> UpdateBillResponse:
    result : dict = await updateBill(billID, updateBillData)
    return UpdateBillResponse(
        statusCode = 200,
        message = "Bill updated successfully",
        bill = Bill(**result)
    )

async def handleDeleteBill(billID : str) -> DeleteBillResponse:
    await deleteBill(billID)
    return DeleteBillResponse(
        statusCode = 200,
        message = "Bill deleted successfully"
    )
