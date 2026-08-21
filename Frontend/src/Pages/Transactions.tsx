import { useEffect, useState, useCallback } from "react"
import AddTransaction from "../Components/Transactions/AddTransaction"
import { type TransactionDetails } from "../Components/Transactions/Types"
import ListTransactions from "../Components/Transactions/ListTransactions"
import UpdateTransaction from "../Components/Transactions/UpdateTransaction"
import { deleteTransaction, getTransactions } from "../API/transactionsAPI"
import { useAPIResponse } from "../Context/APIResponse"
import TextGroup from "../Components/Forms/TextGroup"
import SelectGroup from "../Components/Forms/SelectGroup"
import Button from "../Components/UI/Button"

function Transactions() {
    const [txList, setTxList] = useState<TransactionDetails[]>([])
    const [selectedTx, setSelectedTx] = useState<TransactionDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const [filters, setFilters] = useState({
        category: "",
        transactionType: "",
        transactionDateFrom: "",
        transactionDateTo: "",
        minAmount: "",
        maxAmount: ""
    })

    const refreshTxTable = useCallback(async (currentFilters?: typeof filters) => {
        try {
            const activeFilters: any = {}
            const f = currentFilters || filters
            if (f.category && f.category !== "all") activeFilters.category = f.category
            if (f.transactionType && f.transactionType !== "all") activeFilters.transactionType = f.transactionType
            if (f.transactionDateFrom) activeFilters.transactionDateFrom = new Date(f.transactionDateFrom).toISOString()
            if (f.transactionDateTo) activeFilters.transactionDateTo = new Date(f.transactionDateTo).toISOString()
            if (f.minAmount !== "") activeFilters.minAmount = Number(f.minAmount)
            if (f.maxAmount !== "") activeFilters.maxAmount = Number(f.maxAmount)

            const responseData = await getTransactions(activeFilters)
            setTxList(responseData.transactionList || [])
            setSelectedTx(null)
        } catch (error: any) {
            showFailure(error.message || "Transactions could not be fetched")
            setTxList([])
        }
    }, [showFailure, filters])

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

            <div className="bg-white/5 p-4 rounded-lg my-4 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <SelectGroup 
                        id="filterCategory"
                        name="category"
                        labelName="CATEGORY"
                        value={filters.category || "all"}
                        dropdownItems={{ "all": "All Categories", "food": "Food", "bills": "Bills", "loans": "Loans", "transfer": "Transfer", "other": "Other" }}
                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    />
                    <SelectGroup 
                        id="filterTransactionType"
                        name="transactionType"
                        labelName="TRANSACTION TYPE"
                        value={filters.transactionType || "all"}
                        dropdownItems={{ "all": "All Types", "credit": "Credit", "debit": "Debit" }}
                        onChange={(e) => setFilters(prev => ({ ...prev, transactionType: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterMinAmount"
                        name="minAmount"
                        labelName="MIN AMOUNT"
                        type="number"
                        value={String(filters.minAmount)}
                        placeholder="Min amount"
                        onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterMaxAmount"
                        name="maxAmount"
                        labelName="MAX AMOUNT"
                        type="number"
                        value={String(filters.maxAmount)}
                        placeholder="Max amount"
                        onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterTransactionDateFrom"
                        name="transactionDateFrom"
                        labelName="TRANSACTION DATE FROM"
                        type="date"
                        value={filters.transactionDateFrom}
                        onChange={(e) => setFilters(prev => ({ ...prev, transactionDateFrom: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterTransactionDateTo"
                        name="transactionDateTo"
                        labelName="TRANSACTION DATE TO"
                        type="date"
                        value={filters.transactionDateTo}
                        onChange={(e) => setFilters(prev => ({ ...prev, transactionDateTo: e.target.value }))}
                    />
                </div>
                <div className="flex gap-2 justify-end mt-3">
                    <Button variant="ghost" className="text-sm" onClick={() => {
                        const cleared = { category: "", transactionType: "", transactionDateFrom: "", transactionDateTo: "", minAmount: "", maxAmount: "" }
                        setFilters(cleared)
                        refreshTxTable(cleared)
                    }}>Reset</Button>
                    <Button variant="secondary" className="text-sm" onClick={() => refreshTxTable(filters)}>Search</Button>
                </div>
            </div>

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

