from Database.Transactions import addNewTransaction, getTransaction, getTransactionList, updateTransaction, deleteTransaction
from Responses.Transactions import CreateTransactionResponse, GetTransactionResponse, UpdateTransactionResponse, DeleteTransactionResponse
from Models.Transactions import Transaction, TransactionBase, UpdateTransaction, TransactionFilter
from Schema.Transaction import TransactionSchema
from Utils.GenerateUUID import generateUUID
from typing import Optional


async def handleCreateTransaction(createTransaction : TransactionBase) -> CreateTransactionResponse:
    transactionSchema : TransactionSchema = TransactionSchema(**createTransaction.model_dump(),
        transactionID= generateUUID()
    )
    result : str = await addNewTransaction(transactionSchema)    
    return CreateTransactionResponse(
        transactionID = result,
        statusCode = 200,
        message = "Transaction created successfully",
    )

async def handleGetTransaction(transactionID : str) -> GetTransactionResponse:
    result : dict = await getTransaction(transactionID)
    return GetTransactionResponse(
        statusCode = 200,
        message = "Transaction fetched successfully",
        transaction = Transaction(**result)
    )

async def handleGetTransactionList(filters: Optional[TransactionFilter] = None) -> GetTransactionResponse:
    result : list[dict] = await getTransactionList(filters)
    return GetTransactionResponse(
        statusCode = 200,
        message = "Transaction list fetched successfully",
        transactionList = [Transaction(**tx) for tx in result]
    )

async def handleUpdateTransaction(transactionID : str, updateTransactionData : UpdateTransaction) -> UpdateTransactionResponse:
    result : dict = await updateTransaction(transactionID, updateTransactionData)
    return UpdateTransactionResponse(
        statusCode = 200,
        message = "Transaction updated successfully",
        transaction = Transaction(**result)
    )

async def handleDeleteTransaction(transactionID : str) -> DeleteTransactionResponse:
    await deleteTransaction(transactionID)
    return DeleteTransactionResponse(
        statusCode = 200,
        message = "Transaction deleted successfully"
    )
