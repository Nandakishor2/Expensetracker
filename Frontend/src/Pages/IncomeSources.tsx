import { useEffect, useState, useCallback } from "react"
import AddIncomeSource from "../Components/IncomeSource/AddIncomeSource"
import { type IncomeSourceDetails } from "../Components/IncomeSource/Types"
import ListIncomeSources from "../Components/IncomeSource/ListIncomeSources"
import UpdateIncomeSource from "../Components/IncomeSource/UpdateIncomeSource"
import { deleteIncomeSource, getIncomeSources } from "../API/incomeSourceAPI"
import { getAccountDetails } from "../API/accountAPI"
import { useAPIResponse } from "../Context/APIResponse"
import TextGroup from "../Components/Forms/TextGroup"
import SelectGroup from "../Components/Forms/SelectGroup"
import Button from "../Components/UI/Button"

function IncomeSources() {
    const [incomeList, setIncomeList] = useState<IncomeSourceDetails[]>([])
    const [selectedIncome, setSelectedIncome] = useState<IncomeSourceDetails | null>(null)
    const [accountsMap, setAccountsMap] = useState<Record<string, string>>({})
    const { showSuccess, showFailure } = useAPIResponse()

    const [filters, setFilters] = useState({
        incomeSourceStatus: undefined as boolean | undefined,
        accountID: "",
        sourceName: "",
        creditedDateFrom: "" as string | number,
        creditedDateTo: "" as string | number,
        minAmount: "",
        maxAmount: ""
    })

    const fetchAccounts = useCallback(async () => {
        try {
            const data = await getAccountDetails()
            const mapping: Record<string, string> = {}
            if (data.accountDetailsList) {
                data.accountDetailsList.forEach((a: any) => {
                    mapping[a.accountID] = `${a.bankName} (${a.accountType})`
                })
            }
            setAccountsMap(mapping)
        } catch (err: any) {
            console.error("Failed to fetch accounts", err)
        }
    }, [])

    const refreshIncomeTable = useCallback(async (currentFilters?: typeof filters) => {
        try {
            await fetchAccounts()
            const activeFilters: any = {}
            const f = currentFilters || filters
            if (f.incomeSourceStatus !== undefined) activeFilters.incomeSourceStatus = f.incomeSourceStatus
            if (f.accountID) activeFilters.accountID = f.accountID
            if (f.sourceName.trim()) activeFilters.sourceName = f.sourceName.trim()
            if (f.creditedDateFrom !== "") activeFilters.creditedDateFrom = Number(f.creditedDateFrom)
            if (f.creditedDateTo !== "") activeFilters.creditedDateTo = Number(f.creditedDateTo)
            if (f.minAmount !== "") activeFilters.minAmount = Number(f.minAmount)
            if (f.maxAmount !== "") activeFilters.maxAmount = Number(f.maxAmount)

            const responseData = await getIncomeSources(activeFilters)
            setIncomeList(responseData.incomeSourceList || [])
            setSelectedIncome(null)
        } catch (error: any) {
            showFailure(error.message || "Income Sources could not be fetched")
            setIncomeList([])
        }
    }, [fetchAccounts, showFailure, filters])

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

            <div className="bg-white/5 p-4 rounded-lg my-4 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <TextGroup 
                        id="filterSourceName"
                        name="sourceName"
                        labelName="SOURCE NAME"
                        value={filters.sourceName}
                        placeholder="Filter by source name"
                        onChange={(e) => setFilters(prev => ({ ...prev, sourceName: e.target.value }))}
                    />
                    <SelectGroup 
                        id="filterIncomeSourceStatus"
                        name="incomeSourceStatus"
                        labelName="STATUS"
                        value={filters.incomeSourceStatus === undefined ? "all" : String(filters.incomeSourceStatus)}
                        dropdownItems={{ "all": "All", "true": "Active / Valid", "false": "Inactive / Terminated" }}
                        onChange={(e) => {
                            const val = e.target.value === "all" ? undefined : e.target.value === "true"
                            setFilters(prev => ({ ...prev, incomeSourceStatus: val }))
                        }}
                    />
                    <SelectGroup 
                        id="filterAccountID"
                        name="accountID"
                        labelName="BANK ACCOUNT"
                        value={filters.accountID || "all"}
                        dropdownItems={{ "all": "All Accounts", ...accountsMap }}
                        onChange={(e) => setFilters(prev => ({ ...prev, accountID: e.target.value === "all" ? "" : e.target.value }))}
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
                        id="filterCreditedDateFrom"
                        name="creditedDateFrom"
                        labelName="CREDITED DATE FROM"
                        type="number"
                        value={String(filters.creditedDateFrom)}
                        placeholder="E.g. 1"
                        onChange={(e) => setFilters(prev => ({ ...prev, creditedDateFrom: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterCreditedDateTo"
                        name="creditedDateTo"
                        labelName="CREDITED DATE TO"
                        type="number"
                        value={String(filters.creditedDateTo)}
                        placeholder="E.g. 31"
                        onChange={(e) => setFilters(prev => ({ ...prev, creditedDateTo: e.target.value }))}
                    />
                </div>
                <div className="flex gap-2 justify-end mt-3">
                    <Button variant="ghost" className="text-sm" onClick={() => {
                        const cleared = { incomeSourceStatus: undefined, accountID: "", sourceName: "", creditedDateFrom: "", creditedDateTo: "", minAmount: "", maxAmount: "" }
                        setFilters(cleared)
                        refreshIncomeTable(cleared)
                    }}>Reset</Button>
                    <Button variant="secondary" className="text-sm" onClick={() => refreshIncomeTable(filters)}>Search</Button>
                </div>
            </div>

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

