import { useEffect, useState, useCallback } from "react"
import AddBill from "../Components/Bills/AddBill"
import { type BillDetails } from "../Components/Bills/Types"
import ListBills from "../Components/Bills/ListBills"
import UpdateBill from "../Components/Bills/UpdateBill"
import { deleteBill, getBills } from "../API/billsAPI"
import { useAPIResponse } from "../Context/APIResponse"
import TextGroup from "../Components/Forms/TextGroup"
import SelectGroup from "../Components/Forms/SelectGroup"
import Button from "../Components/UI/Button"

function Bills() {
    const [billList, setBillList] = useState<BillDetails[]>([])
    const [selectedBill, setSelectedBill] = useState<BillDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const [filters, setFilters] = useState({
        isActive: undefined as boolean | undefined,
        dueDateFrom: "" as string | number,
        dueDateTo: "" as string | number,
        organization: ""
    })

    const refreshBillsTable = useCallback(async (currentFilters?: typeof filters) => {
        try {
            const activeFilters: any = {}
            const f = currentFilters || filters
            if (f.isActive !== undefined) activeFilters.isActive = f.isActive
            if (f.dueDateFrom !== "") activeFilters.dueDateFrom = Number(f.dueDateFrom)
            if (f.dueDateTo !== "") activeFilters.dueDateTo = Number(f.dueDateTo)
            if (f.organization.trim() !== "") activeFilters.organization = f.organization.trim()

            const responseData = await getBills(activeFilters)
            setBillList(responseData.billList || [])
            setSelectedBill(null)
        } catch (error: any) {
            showFailure(error.message || "Bills could not be fetched")
            setBillList([])
        }
    }, [showFailure, filters])

    const handleDeleteBill = useCallback(async (billID: string) => {
        try {
            const responseData = await deleteBill(billID)
            showSuccess(responseData.message || "Bill deleted successfully", 3000)
            refreshBillsTable()
        } catch (error: any) {
            showFailure(error.message || "Bill could not be deleted")
        }
    }, [refreshBillsTable, showSuccess, showFailure])

    useEffect(() => {
        refreshBillsTable()
    }, [refreshBillsTable])

    return (
        <>
            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">Bills</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete bills here.</p>
            </div>
            {
                selectedBill != null ? (
                    <UpdateBill existingDetails={selectedBill} refreshTableFunction={refreshBillsTable} />
                ) : (
                    <AddBill refreshTableFunction={refreshBillsTable} />
                )
            }

            <div className="bg-white/5 p-4 rounded-lg my-4 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <TextGroup 
                        id="filterOrganization"
                        name="organization"
                        labelName="ORGANIZATION"
                        value={filters.organization}
                        placeholder="Filter by organization"
                        onChange={(e) => setFilters(prev => ({ ...prev, organization: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterDueDateFrom"
                        name="dueDateFrom"
                        labelName="DUE DATE FROM"
                        type="number"
                        value={String(filters.dueDateFrom)}
                        placeholder="E.g. 1"
                        onChange={(e) => setFilters(prev => ({ ...prev, dueDateFrom: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterDueDateTo"
                        name="dueDateTo"
                        labelName="DUE DATE TO"
                        type="number"
                        value={String(filters.dueDateTo)}
                        placeholder="E.g. 31"
                        onChange={(e) => setFilters(prev => ({ ...prev, dueDateTo: e.target.value }))}
                    />
                    <SelectGroup 
                        id="filterIsActive"
                        name="isActive"
                        labelName="STATUS"
                        value={filters.isActive === undefined ? "all" : String(filters.isActive)}
                        dropdownItems={{ "all": "All", "true": "Active", "false": "Inactive" }}
                        onChange={(e) => {
                            const val = e.target.value === "all" ? undefined : e.target.value === "true"
                            setFilters(prev => ({ ...prev, isActive: val }))
                        }}
                    />
                </div>
                <div className="flex gap-2 justify-end mt-3">
                    <Button variant="ghost" className="text-sm" onClick={() => {
                        const cleared = { isActive: undefined, dueDateFrom: "", dueDateTo: "", organization: "" }
                        setFilters(cleared)
                        refreshBillsTable(cleared)
                    }}>Reset</Button>
                    <Button variant="secondary" className="text-sm" onClick={() => refreshBillsTable(filters)}>Search</Button>
                </div>
            </div>

            <hr className="mt-2 mb-2" />
            <ListBills 
                billList={billList} 
                onEditBill={(bill) => {
                    console.log("Edit Bill Details", bill)
                    setSelectedBill(bill)
                }}
                onDeleteBill={handleDeleteBill}
            />
        </>
    )
}

export default Bills

