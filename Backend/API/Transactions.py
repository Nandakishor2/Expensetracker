from Responses.Transactions import CreateTransactionResponse, GetTransactionResponse, UpdateTransactionResponse, DeleteTransactionResponse
from Services.Transactions import handleCreateTransaction, handleDeleteTransaction, handleGetTransaction, handleGetTransactionList, handleUpdateTransaction
from Models.Transactions import TransactionBase, UpdateTransaction, TransactionFilter
from fastapi.responses import JSONResponse
from fastapi.routing import APIRouter
from fastapi import Depends

transactionRouter = APIRouter(prefix="/Transactions", tags=["Transactions"])

@transactionRouter.get("/")
async def getTransactionList(filters: TransactionFilter = Depends()):
    response : GetTransactionResponse = await handleGetTransactionList(filters)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_none=True,exclude_unset=True,mode="json")
    )

@transactionRouter.get("/{transactionID}")
async def getTransactionDetails(transactionID:str):
    response : GetTransactionResponse = await handleGetTransaction(transactionID)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_none=True,exclude_unset=True,mode="json")
    )

@transactionRouter.post("/")
async def createTransaction(transaction:TransactionBase):
    response : CreateTransactionResponse = await handleCreateTransaction(transaction)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_none=True,exclude_unset=True,mode="json")
    )

@transactionRouter.put("/{transactionID}")
async def updateTransaction(transactionID:str,transaction:UpdateTransaction):
    response : UpdateTransactionResponse = await handleUpdateTransaction(transactionID,transaction)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_none=True,exclude_unset=True,mode="json")
    )

@transactionRouter.delete("/{transactionID}")
async def deleteTransaction(transactionID:str):
    response : DeleteTransactionResponse = await handleDeleteTransaction(transactionID)
    return JSONResponse(
        status_code=response.statusCode,
        content=response.model_dump(exclude_none=True,exclude_unset=True,mode="json")
    )
