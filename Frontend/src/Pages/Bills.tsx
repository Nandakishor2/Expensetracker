import { useEffect, useState, useCallback } from "react"
import AddBill from "../Components/Bills/AddBill"
import { type BillDetails } from "../Components/Bills/Types"
import ListBills from "../Components/Bills/ListBills"
import UpdateBill from "../Components/Bills/UpdateBill"
import { deleteBill, getBills } from "../API/billsAPI"
import { useAPIResponse } from "../Context/APIResponse"

function Bills() {
    const [billList, setBillList] = useState<BillDetails[]>([])
    const [selectedBill, setSelectedBill] = useState<BillDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const refreshBillsTable = useCallback(async () => {
        try {
            const responseData = await getBills()
            setBillList(responseData.billList || [])
            setSelectedBill(null)
        } catch (error: any) {
            showFailure(error.message || "Bills could not be fetched")
            setBillList([])
        }
    }, [showFailure])

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

