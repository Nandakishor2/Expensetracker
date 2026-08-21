import { useEffect, useState, useCallback } from "react"
import AddCreditHistory from "../Components/CreditHistory/AddCreditHistory"
import { type CreditHistoryDetails } from "../Components/CreditHistory/Types"
import ListCreditHistory from "../Components/CreditHistory/ListCreditHistory"
import UpdateCreditHistory from "../Components/CreditHistory/UpdateCreditHistory"
import { deleteCreditHistory, getCreditHistory } from "../API/creditHistoryAPI"
import { getPeople } from "../API/peopleAPI"
import type { PersonDetails } from "../Components/People/Types"
import { useAPIResponse } from "../Context/APIResponse"
import TextGroup from "../Components/Forms/TextGroup"
import SelectGroup from "../Components/Forms/SelectGroup"
import Button from "../Components/UI/Button"

function CreditHistory() {
    const [historyList, setHistoryList] = useState<CreditHistoryDetails[]>([])
    const [selectedDetails, setSelectedDetails] = useState<CreditHistoryDetails | null>(null)
    const [lenderMap, setLenderMap] = useState<Record<string, string>>({})
    const { showSuccess, showFailure } = useAPIResponse()

    const [filters, setFilters] = useState({
        dueCleared: undefined as boolean | undefined,
        peopleID: "",
        creditPaymentMode: "",
        recievedDateFrom: "",
        recievedDateTo: "",
        minAmount: "",
        maxAmount: ""
    })

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

    const refreshHistoryTable = useCallback(async (currentFilters?: typeof filters) => {
        try {
            await fetchLenders()
            const activeFilters: any = {}
            const f = currentFilters || filters
            if (f.dueCleared !== undefined) activeFilters.dueCleared = f.dueCleared
            if (f.peopleID) activeFilters.peopleID = f.peopleID
            if (f.creditPaymentMode.trim()) activeFilters.creditPaymentMode = f.creditPaymentMode.trim()
            if (f.recievedDateFrom) activeFilters.recievedDateFrom = new Date(f.recievedDateFrom).toISOString()
            if (f.recievedDateTo) activeFilters.recievedDateTo = new Date(f.recievedDateTo).toISOString()
            if (f.minAmount !== "") activeFilters.minAmount = Number(f.minAmount)
            if (f.maxAmount !== "") activeFilters.maxAmount = Number(f.maxAmount)

            const responseData = await getCreditHistory(activeFilters)
            setHistoryList(responseData.creditHistoryList || [])
            setSelectedDetails(null)
        } catch (error: any) {
            showFailure(error.message || "Credit History could not be fetched")
            setHistoryList([])
        }
    }, [fetchLenders, showFailure, filters])

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

            <div className="bg-white/5 p-4 rounded-lg my-4 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <SelectGroup 
                        id="filterPeopleID"
                        name="peopleID"
                        labelName="LENDER"
                        value={filters.peopleID || "all"}
                        dropdownItems={{ "all": "All Lenders", ...lenderMap }}
                        onChange={(e) => setFilters(prev => ({ ...prev, peopleID: e.target.value === "all" ? "" : e.target.value }))}
                    />
                    <SelectGroup 
                        id="filterDueCleared"
                        name="dueCleared"
                        labelName="REPAYMENT STATUS"
                        value={filters.dueCleared === undefined ? "all" : String(filters.dueCleared)}
                        dropdownItems={{ "all": "All", "true": "Cleared", "false": "Not Cleared" }}
                        onChange={(e) => {
                            const val = e.target.value === "all" ? undefined : e.target.value === "true"
                            setFilters(prev => ({ ...prev, dueCleared: val }))
                        }}
                    />
                    <TextGroup 
                        id="filterCreditPaymentMode"
                        name="creditPaymentMode"
                        labelName="PAYMENT MODE"
                        value={filters.creditPaymentMode}
                        placeholder="E.g. Cash, Bank Transfer"
                        onChange={(e) => setFilters(prev => ({ ...prev, creditPaymentMode: e.target.value }))}
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
                        id="filterRecievedDateFrom"
                        name="recievedDateFrom"
                        labelName="RECEIVED DATE FROM"
                        type="date"
                        value={filters.recievedDateFrom}
                        onChange={(e) => setFilters(prev => ({ ...prev, recievedDateFrom: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterRecievedDateTo"
                        name="recievedDateTo"
                        labelName="RECEIVED DATE TO"
                        type="date"
                        value={filters.recievedDateTo}
                        onChange={(e) => setFilters(prev => ({ ...prev, recievedDateTo: e.target.value }))}
                    />
                </div>
                <div className="flex gap-2 justify-end mt-3">
                    <Button variant="ghost" className="text-sm" onClick={() => {
                        const cleared = { dueCleared: undefined, peopleID: "", creditPaymentMode: "", recievedDateFrom: "", recievedDateTo: "", minAmount: "", maxAmount: "" }
                        setFilters(cleared)
                        refreshHistoryTable(cleared)
                    }}>Reset</Button>
                    <Button variant="secondary" className="text-sm" onClick={() => refreshHistoryTable(filters)}>Search</Button>
                </div>
            </div>

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

