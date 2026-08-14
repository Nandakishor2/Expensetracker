import { useEffect, useState } from "react"
import AddTransaction from "../Components/Transactions/AddTransaction"
import { type TransactionDetails } from "../Components/Transactions/Types"
import ListTransactions from "../Components/Transactions/ListTransactions"
import UpdateTransaction from "../Components/Transactions/UpdateTransaction"
import { deleteTransaction, getTransactions } from "../API/transactionsAPI"

function Transactions() {
    const [txList, setTxList] = useState<TransactionDetails[]>([])
    const [selectedTx, setSelectedTx] = useState<TransactionDetails | null>(null)

    async function refreshTxTable() {
        try {
            const responseData = await getTransactions()
            console.log(responseData.message)
            setTxList(responseData.transactionList || [])
            setSelectedTx(null)
        } catch {
            console.log("Transactions could not be fetched")
            setTxList([])
        }
    }

    async function handleDeleteTx(transactionID: string) {
        try {
            const responseData = await deleteTransaction(transactionID)
            console.log(responseData.message)
            refreshTxTable()
        } catch {
            console.log("Transaction could not be deleted")
        }
    }

    useEffect(() => {
        refreshTxTable()
    }, [])

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
