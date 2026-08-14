import { useEffect, useState } from "react"
import AddIncomeSource from "../Components/IncomeSource/AddIncomeSource"
import { type IncomeSourceDetails } from "../Components/IncomeSource/Types"
import ListIncomeSources from "../Components/IncomeSource/ListIncomeSources"
import UpdateIncomeSource from "../Components/IncomeSource/UpdateIncomeSource"
import { deleteIncomeSource, getIncomeSources } from "../API/incomeSourceAPI"

function IncomeSources() {
    const [incomeList, setIncomeList] = useState<IncomeSourceDetails[]>([])
    const [selectedIncome, setSelectedIncome] = useState<IncomeSourceDetails | null>(null)

    async function refreshIncomeTable() {
        try {
            const responseData = await getIncomeSources()
            console.log(responseData.message)
            setIncomeList(responseData.incomeSourceList || [])
            setSelectedIncome(null)
        } catch {
            console.log("Income Sources could not be fetched")
            setIncomeList([])
        }
    }

    async function handleDeleteIncome(incomeID: string) {
        try {
            const responseData = await deleteIncomeSource(incomeID)
            console.log(responseData.message)
            refreshIncomeTable()
        } catch {
            console.log("Income Source could not be deleted")
        }
    }

    useEffect(() => {
        refreshIncomeTable()
    }, [])

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
