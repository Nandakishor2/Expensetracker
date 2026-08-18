import { useEffect, useState, useCallback } from "react"
import AddCreditHistory from "../Components/CreditHistory/AddCreditHistory"
import { type CreditHistoryDetails } from "../Components/CreditHistory/Types"
import ListCreditHistory from "../Components/CreditHistory/ListCreditHistory"
import UpdateCreditHistory from "../Components/CreditHistory/UpdateCreditHistory"
import { deleteCreditHistory, getCreditHistory } from "../API/creditHistoryAPI"
import { getPeople } from "../API/peopleAPI"
import type { PersonDetails } from "../Components/People/Types"
import { useAPIResponse } from "../Context/APIResponse"

function CreditHistory() {
    const [historyList, setHistoryList] = useState<CreditHistoryDetails[]>([])
    const [selectedDetails, setSelectedDetails] = useState<CreditHistoryDetails | null>(null)
    const [lenderMap, setLenderMap] = useState<Record<string, string>>({})
    const { showSuccess, showFailure } = useAPIResponse()

    const fetchLenders = useCallback(async () => {
        try {
            const data = await getPeople()
            const mapping: Record<string, string> = {}
            if (data.peopleList) {
                data.peopleList.forEach((p: PersonDetails) => {
                    mapping[p.personID] = p.name
                })
            }
            setLenderMap(mapping)
        } catch (err: any) {
            console.error("Failed to fetch lenders mapping", err)
        }
    }, [])

    const refreshHistoryTable = useCallback(async () => {
        try {
            await fetchLenders()
            const responseData = await getCreditHistory()
            setHistoryList(responseData.creditHistoryList || [])
            setSelectedDetails(null)
        } catch (error: any) {
            showFailure(error.message || "Credit History could not be fetched")
            setHistoryList([])
        }
    }, [fetchLenders, showFailure])

    const handleDelete = useCallback(async (creditHistoryID: string) => {
        try {
            const res = await deleteCreditHistory(creditHistoryID)
            showSuccess(res.message || "Credit History deleted successfully", 3000)
            refreshHistoryTable()
        } catch (error: any) {
            showFailure(error.message || "Credit History could not be deleted")
        }
    }, [refreshHistoryTable, showSuccess, showFailure])

    useEffect(() => {
        refreshHistoryTable()
    }, [refreshHistoryTable])

    return (
        <>
            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">Debts (Credit History)</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete credit history here.</p>
            </div>
            {
                selectedDetails != null ? (
                    <UpdateCreditHistory existingDetails={selectedDetails} refreshTableFunction={refreshHistoryTable} />
                ) : (
                    <AddCreditHistory refreshTableFunction={refreshHistoryTable} />
                )
            }

            <hr className="mt-2 mb-2" />
            <ListCreditHistory 
                creditHistoryList={historyList} 
                lenderMap={lenderMap}
                onEditCreditHistory={(details) => {
                    console.log("Edit Credit History Details", details)
                    setSelectedDetails(details)
                }}
                onDeleteCreditHistory={handleDelete}
            />
        </>
    )
}

export default CreditHistory

