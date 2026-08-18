import { useEffect, useState, useCallback } from "react"
import AddTransaction from "../Components/Transactions/AddTransaction"
import { type TransactionDetails } from "../Components/Transactions/Types"
import ListTransactions from "../Components/Transactions/ListTransactions"
import UpdateTransaction from "../Components/Transactions/UpdateTransaction"
import { deleteTransaction, getTransactions } from "../API/transactionsAPI"
import { useAPIResponse } from "../Context/APIResponse"

function Transactions() {
    const [txList, setTxList] = useState<TransactionDetails[]>([])
    const [selectedTx, setSelectedTx] = useState<TransactionDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const refreshTxTable = useCallback(async () => {
        try {
            const responseData = await getTransactions()
            setTxList(responseData.transactionList || [])
            setSelectedTx(null)
        } catch (error: any) {
            showFailure(error.message || "Transactions could not be fetched")
            setTxList([])
        }
    }, [showFailure])

    const handleDeleteTx = useCallback(async (transactionID: string) => {
        try {
            const responseData = await deleteTransaction(transactionID)
            showSuccess(responseData.message || "Transaction deleted successfully", 3000)
            refreshTxTable()
        } catch (error: any) {
            showFailure(error.message || "Transaction could not be deleted")
        }
    }, [refreshTxTable, showSuccess, showFailure])

    useEffect(() => {
        refreshTxTable()
    }, [refreshTxTable])

    return (
        <>
            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">Transactions</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete transactions here.</p>
            </div>
            {
                selectedTx != null ? (
                    <UpdateTransaction existingDetails={selectedTx} refreshTableFunction={refreshTxTable} />
                ) : (
                    <AddTransaction refreshTableFunction={refreshTxTable} />
                )
            }

            <hr className="mt-2 mb-2" />
            <ListTransactions 
                transactionList={txList} 
                onEditTransaction={(tx) => {
                    console.log("Edit Transaction Details", tx)
                    setSelectedTx(tx)
                }}
                onDeleteTransaction={handleDeleteTx}
            />
        </>
    )
}

export default Transactions

