import { useEffect, useState, useCallback } from "react"
import AddIncomeSource from "../Components/IncomeSource/AddIncomeSource"
import { type IncomeSourceDetails } from "../Components/IncomeSource/Types"
import ListIncomeSources from "../Components/IncomeSource/ListIncomeSources"
import UpdateIncomeSource from "../Components/IncomeSource/UpdateIncomeSource"
import { deleteIncomeSource, getIncomeSources } from "../API/incomeSourceAPI"
import { useAPIResponse } from "../Context/APIResponse"

function IncomeSources() {
    const [incomeList, setIncomeList] = useState<IncomeSourceDetails[]>([])
    const [selectedIncome, setSelectedIncome] = useState<IncomeSourceDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const refreshIncomeTable = useCallback(async () => {
        try {
            const responseData = await getIncomeSources()
            setIncomeList(responseData.incomeSourceList || [])
            setSelectedIncome(null)
        } catch (error: any) {
            showFailure(error.message || "Income Sources could not be fetched")
            setIncomeList([])
        }
    }, [showFailure])

    const handleDeleteIncome = useCallback(async (incomeID: string) => {
        try {
            const responseData = await deleteIncomeSource(incomeID)
            showSuccess(responseData.message || "Income Source deleted successfully", 3000)
            refreshIncomeTable()
        } catch (error: any) {
            showFailure(error.message || "Income Source could not be deleted")
        }
    }, [refreshIncomeTable, showSuccess, showFailure])

    useEffect(() => {
        refreshIncomeTable()
    }, [refreshIncomeTable])

    return (
        <>
            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">Income Sources</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete income sources here.</p>
            </div>
            {
                selectedIncome != null ? (
                    <UpdateIncomeSource existingDetails={selectedIncome} refreshTableFunction={refreshIncomeTable} />
                ) : (
                    <AddIncomeSource refreshTableFunction={refreshIncomeTable} />
                )
            }

            <hr className="mt-2 mb-2" />
            <ListIncomeSources 
                incomeSourceList={incomeList} 
                onEditIncomeSource={(income) => {
                    console.log("Edit Income Source Details", income)
                    setSelectedIncome(income)
                }}
                onDeleteIncomeSource={handleDeleteIncome}
            />
        </>
    )
}

export default IncomeSources

