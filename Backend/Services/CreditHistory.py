from Database.CreditHistory import insertCreditHistory,getCreditHistory,findCreditHistory,updateCreditHistory,deleteCreditHistory
from Models.CreditHistory import CreditHistory,CreateCreditHistory,UpdateCreditHistory, CreditHistoryFilter
from Schema.CreditHistory import CreditHistorySchema
from Utils.GenerateUUID import generateUUID
from Responses.CreditHistory import CreateCreditHistoryResponse,GetCreditHistoryResponse,UpdateCreditHistoryResponse,DeleteCreditHistoryResponse
import logging
from typing import Optional

async def handleCreateCreditHistory(creditHistory : CreateCreditHistory) -> CreateCreditHistoryResponse:
    """Handles the creation of a new credit history"""
    newCreditHistoryID = generateUUID()
    
    newCreditHistory : CreditHistorySchema = CreditHistorySchema(creditHistoryID=newCreditHistoryID, **creditHistory.model_dump())
    
    newCreditHistoryID : str = await insertCreditHistory(newCreditHistory)
    
    response : CreateCreditHistoryResponse = CreateCreditHistoryResponse(
        statusCode = 200,
        message = "Credit History Created Successfully",
        creditHistoryID = newCreditHistoryID
    )
    return response

    

async def handleGetCreditHistory(filters: Optional[CreditHistoryFilter] = None) -> GetCreditHistoryResponse:
    """Handles the retrieval of all credit histories"""
    creditHistoryList : list[dict] = await getCreditHistory(filters)

    response : GetCreditHistoryResponse = GetCreditHistoryResponse(
        statusCode = 200,
        message = "Credit History Fetched Successfully",
        creditHistoryList = [CreditHistory(**creditHistory) for creditHistory in creditHistoryList]
    )
    return response

async def handleFindCreditHistory(creditHistoryID : str) -> Optional[CreditHistory]:
    """Handles the retrieval of a specific credit history"""
    creditHistoryDetails : CreditHistory = await findCreditHistory(creditHistoryID)

    response : GetCreditHistoryResponse = GetCreditHistoryResponse(
        statusCode = 200,
        message = "Credit History Fetched Successfully",
        creditHistoryDetails = CreditHistory(**creditHistoryDetails)
    )
    return response


async def handleUpdateCreditHistory(creditHistory : CreditHistory, updateData : UpdateCreditHistory) -> bool:
    """Handles the update of a specific credit history"""
    updatedCreditHistory : dict = await updateCreditHistory(creditHistory, updateData)
    
    response : UpdateCreditHistoryResponse = UpdateCreditHistoryResponse(
        statusCode = 200,
        message = "Credit History Fetched Successfully",
        creditHistoryDetails = CreditHistory(**updatedCreditHistory)
    )
    return response

async def handleDeleteCreditHistory(creditHistoryID : str) -> bool:
    """Handles the deletion of a specific credit history"""
    await deleteCreditHistory(creditHistoryID)
    response : DeleteCreditHistoryResponse = DeleteCreditHistoryResponse(
        statusCode = 200,
        message = "Credit History Deleted Successfully"
    )
    return response
    