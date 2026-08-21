import { useEffect, useState, useCallback } from "react"
import ListLoans from "../Components/Loans/ListLoans"
import type { loanDetails } from "../Components/Loans/Types"
import { getLoanDetails, deleteLoanDetails } from "../API/LoansAPI"
import AddLoan from "../Components/Loans/AddLoan"
import UpdateLoan from "../Components/Loans/UpdateLoan"
import { useAPIResponse } from "../Context/APIResponse"
import TextGroup from "../Components/Forms/TextGroup"
import SelectGroup from "../Components/Forms/SelectGroup"
import Button from "../Components/UI/Button"

function Loans() {
    const [loanList, setLoanList] = useState<loanDetails[]>([])
    const [selectedLoan, setSelectedLoan] = useState<loanDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const [filters, setFilters] = useState({
        activeStatus: undefined as boolean | undefined,
        companyName: "",
        startDateFrom: "",
        startDateTo: "",
        minLoanAmount: "",
        maxLoanAmount: ""
    })

    const refreshLoansTable = useCallback(async (currentFilters?: typeof filters) => {
        try {
            const activeFilters: any = {}
            const f = currentFilters || filters
            if (f.activeStatus !== undefined) activeFilters.activeStatus = f.activeStatus
            if (f.companyName.trim()) activeFilters.companyName = f.companyName.trim()
            if (f.startDateFrom) activeFilters.startDateFrom = new Date(f.startDateFrom).toISOString()
            if (f.startDateTo) activeFilters.startDateTo = new Date(f.startDateTo).toISOString()
            if (f.minLoanAmount !== "") activeFilters.minLoanAmount = Number(f.minLoanAmount)
            if (f.maxLoanAmount !== "") activeFilters.maxLoanAmount = Number(f.maxLoanAmount)

            const responseData = await getLoanDetails(activeFilters)
            setLoanList(responseData.loanDetailsList || [])
            setSelectedLoan(null)
        } catch (error: any) {
            showFailure(error.message || "Loan Details could not be fetched")
            setLoanList([])
        }
    }, [showFailure, filters])

    const deleteLoan = useCallback(async (loanID: string) => {
        try {
            const responseData = await deleteLoanDetails(loanID)
            showSuccess(responseData.message || "Loan deleted successfully", 3000)
            refreshLoansTable()
        } catch (error: any) {
            showFailure(error.message || "Loan could not be deleted")
        }
    }, [refreshLoansTable, showSuccess, showFailure])

    useEffect(() => {
        refreshLoansTable()
    }, [refreshLoansTable])

    return (
        <>
            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">Loans</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete your loans from here.</p>
            </div>
            {
                selectedLoan != null ? (
                    <UpdateLoan existingLoanDetails={selectedLoan} refreshTableFunction={refreshLoansTable} />
                ) : (
                    <AddLoan refreshTableFunction={refreshLoansTable} />
                )
            }

            <div className="bg-white/5 p-4 rounded-lg my-4 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <TextGroup 
                        id="filterCompanyName"
                        name="companyName"
                        labelName="COMPANY NAME"
                        value={filters.companyName}
                        placeholder="Filter by company name"
                        onChange={(e) => setFilters(prev => ({ ...prev, companyName: e.target.value }))}
                    />
                    <SelectGroup 
                        id="filterActiveStatus"
                        name="activeStatus"
                        labelName="ACTIVE STATUS"
                        value={filters.activeStatus === undefined ? "all" : String(filters.activeStatus)}
                        dropdownItems={{ "all": "All", "true": "Active", "false": "Inactive" }}
                        onChange={(e) => {
                            const val = e.target.value === "all" ? undefined : e.target.value === "true"
                            setFilters(prev => ({ ...prev, activeStatus: val }))
                        }}
                    />
                    <TextGroup 
                        id="filterMinLoanAmount"
                        name="minLoanAmount"
                        labelName="MIN LOAN AMOUNT"
                        type="number"
                        value={String(filters.minLoanAmount)}
                        placeholder="Min loan amount"
                        onChange={(e) => setFilters(prev => ({ ...prev, minLoanAmount: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterMaxLoanAmount"
                        name="maxLoanAmount"
                        labelName="MAX LOAN AMOUNT"
                        type="number"
                        value={String(filters.maxLoanAmount)}
                        placeholder="Max loan amount"
                        onChange={(e) => setFilters(prev => ({ ...prev, maxLoanAmount: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterStartDateFrom"
                        name="startDateFrom"
                        labelName="START DATE FROM"
                        type="date"
                        value={filters.startDateFrom}
                        onChange={(e) => setFilters(prev => ({ ...prev, startDateFrom: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterStartDateTo"
                        name="startDateTo"
                        labelName="START DATE TO"
                        type="date"
                        value={filters.startDateTo}
                        onChange={(e) => setFilters(prev => ({ ...prev, startDateTo: e.target.value }))}
                    />
                </div>
                <div className="flex gap-2 justify-end mt-3">
                    <Button variant="ghost" className="text-sm" onClick={() => {
                        const cleared = { activeStatus: undefined, companyName: "", startDateFrom: "", startDateTo: "", minLoanAmount: "", maxLoanAmount: "" }
                        setFilters(cleared)
                        refreshLoansTable(cleared)
                    }}>Reset</Button>
                    <Button variant="secondary" className="text-sm" onClick={() => refreshLoansTable(filters)}>Search</Button>
                </div>
            </div>

            <hr className="mt-2 mb-2" />
            
            <ListLoans 
                loanDetailsList={loanList} 
                onEditLoan={(loan) => {
                    console.log("Edit Loan Details", loan)
                    setSelectedLoan(loan)
                }}
                onDeleteLoan={deleteLoan}
            />
        </>
    )
}

export default Loans