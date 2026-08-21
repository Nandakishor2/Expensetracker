import Button from "../UI/Button"
import { useState, useEffect } from "react"
import type { BillDetails } from "./Types"
import BillFormFields from "./BillFormFields"
import { updateBill } from "../../API/billsAPI"
import { useAPIResponse } from "../../Context/APIResponse"

type BillUpdateProps = {
    existingDetails: BillDetails
    refreshTableFunction: () => Promise<any>
}

function UpdateBill({ existingDetails, refreshTableFunction }: BillUpdateProps) {
    const [details, setDetails] = useState<BillDetails>({
        ...existingDetails,
        dueDate: existingDetails.dueDate
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    useEffect(() => {
        setDetails({
            ...existingDetails,
            dueDate: existingDetails.dueDate
        })
    }, [existingDetails])

    async function handleUpdate() {
        setIsSubmitting(true)
        try {
            const res = await updateBill(details.billID, details)
            showSuccess(res.message || "Bill updated successfully", 3000)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to update bill details")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <BillFormFields 
                billDetails={details}
                onChange={(e) => {
                    const { name, value } = e.target
                    setDetails((prev) => ({ 
                        ...prev, 
                        [name]: name === "dueDate" ? (value === "" ? 0 : parseInt(value, 10)) : value 
                    }))
                }} 
            />

            <div className="sm:col-span-9"></div>
            <div className="sm:col-span-3 flex gap-2 justify-end-safe">
                <Button type="button" variant="ghost" onClick={() => {
                    setDetails({
                        ...existingDetails,
                        dueDate: existingDetails.dueDate
                    })
                }} className="text-sm" disabled={isSubmitting}>Reset</Button>
                <Button type="button" variant="primary" onClick={handleUpdate} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                </Button>
            </div>
        </div>
    )
}

export default UpdateBill

