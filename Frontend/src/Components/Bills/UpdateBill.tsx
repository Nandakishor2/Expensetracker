import Button from "../UI/Button"
import { useState } from "react"
import type { BillDetails } from "./Types"
import BillFormFields from "./BillFormFields"
import { updateBill } from "../../API/billsAPI"

type BillUpdateProps = {
    existingDetails: BillDetails
    refreshTableFunction: () => Promise<any>
}

function UpdateBill({ existingDetails, refreshTableFunction }: BillUpdateProps) {
    const [details, setDetails] = useState<BillDetails>({
        ...existingDetails,
        dueDate: existingDetails.dueDate ? String(existingDetails.dueDate).split("T")[0] : ""
    })

    async function handleUpdate() {
        try {
            await updateBill(details.billID, details)
            refreshTableFunction()
        } catch (error) {
            console.error("Failed to update bill details", error)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <BillFormFields 
                billDetails={details}
                onChange={(e) => {
                    const { name, value } = e.target
                    setDetails((prev) => ({ ...prev, [name]: value }))
                }} 
            />

            <div className="sm:col-span-9"></div>
            <div className="sm:col-span-3 flex gap-2 justify-end-safe">
                <Button type="button" variant="ghost" onClick={() => {
                    setDetails({
                        ...existingDetails,
                        dueDate: existingDetails.dueDate ? String(existingDetails.dueDate).split("T")[0] : ""
                    })
                }} className="text-sm">Reset</Button>
                <Button type="button" variant="primary" onClick={handleUpdate} className="text-sm">Update</Button>
            </div>
        </div>
    )
}

export default UpdateBill
