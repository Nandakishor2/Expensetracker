from Database.IncomeSource import addNewIncomeSource,getIncomeSource,getIncomeSourceList,updateIncomeSource,deleteIncomeSource
from Responses.IncomeSource import CreateIncomeSourceResponse,GetIncomeSourceResponse,UpdateIncomeSourceResponse,DeleteIncomeSourceResponse
from Models.IncomeSource import IncomeSource, CreateIncomeSource, UpdateIncomeSource
from Schema.IncomeSource import IncomeSourceSchema
from Utils.GenerateUUID import generateUUID


async def handleCreateIncomeSource(createIncomeSource : CreateIncomeSource) -> CreateIncomeSourceResponse:
    incomeSourceSchema :IncomeSourceSchema = IncomeSourceSchema(**createIncomeSource.model_dump(),
        incomeID= generateUUID()
    )
    result : str = await addNewIncomeSource(incomeSourceSchema)    
    return CreateIncomeSourceResponse(
        incomeID = result,
        statusCode = 200,
        message = "Income source created successfully",
    )

async def handleGetIncomeSource(incomeSourceID : str) -> GetIncomeSourceResponse:
    result : dict = await getIncomeSource(incomeSourceID)
    return GetIncomeSourceResponse(
        statusCode = 200,
        message = "Income source fetched successfully",
        incomeSource = IncomeSource(**result)
    )

async def handleGetIncomeSourceList() -> GetIncomeSourceResponse:
    result : list[dict] = await getIncomeSourceList()
    return GetIncomeSourceResponse(
        statusCode = 200,
        message = "Income source list fetched successfully",
        incomeSourceList = [IncomeSource(**income) for income in result]
    )

async def handleUpdateIncomeSource(incomeSourceID : str, updateIncomeSourceData : UpdateIncomeSource) -> UpdateIncomeSourceResponse:
    result : dict = await updateIncomeSource(incomeSourceID, updateIncomeSourceData)
    return UpdateIncomeSourceResponse(
        statusCode = 200,
        message = "Income source updated successfully",
        incomeSource = IncomeSource(**result)
    )

async def handleDeleteIncomeSource(incomeSourceID : str) -> DeleteIncomeSourceResponse:
    await deleteIncomeSource(incomeSourceID)
    return DeleteIncomeSourceResponse(
        statusCode = 200,
        message = "Income source deleted successfully"
    )
