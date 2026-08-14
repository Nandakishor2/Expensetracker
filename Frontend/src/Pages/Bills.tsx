import { useEffect, useState } from "react"
import AddBill from "../Components/Bills/AddBill"
import { type BillDetails } from "../Components/Bills/Types"
import ListBills from "../Components/Bills/ListBills"
import UpdateBill from "../Components/Bills/UpdateBill"
import { deleteBill, getBills } from "../API/billsAPI"

function Bills() {
    const [billList, setBillList] = useState<BillDetails[]>([])
    const [selectedBill, setSelectedBill] = useState<BillDetails | null>(null)

    async function refreshBillsTable() {
        try {
            const responseData = await getBills()
            console.log(responseData.message)
            setBillList(responseData.billList || [])
            setSelectedBill(null)
        } catch {
            console.log("Bills could not be fetched")
            setBillList([])
        }
    }

    async function handleDeleteBill(billID: string) {
        try {
            const responseData = await deleteBill(billID)
            console.log(responseData.message)
            refreshBillsTable()
        } catch {
            console.log("Bill could not be deleted")
        }
    }

    useEffect(() => {
        refreshBillsTable()
    }, [])

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
