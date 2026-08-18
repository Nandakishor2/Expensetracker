import Button from "../UI/Button"
import { useState } from "react"
import type { CreateBills } from "./Types"
import BillFormFields from "./BillFormFields"
import { createBill } from "../../API/billsAPI"
import { useAPIResponse } from "../../Context/APIResponse"

type AddBillProps = {
    refreshTableFunction: () => Promise<any>
}

function AddBill({ refreshTableFunction }: AddBillProps) {
    const defaultDetails: CreateBills = {
        organization: "",
        description: "",
        dueDate: new Date().toISOString().split("T")[0]
    }

    const [details, setDetails] = useState<CreateBills>(defaultDetails)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    const handleCreate = async () => {
        setIsSubmitting(true)
        try {
            const res = await createBill(details)
            showSuccess(res.message || "Bill added successfully", 3000)
            setDetails(defaultDetails)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to create bill")
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
                    setDetails((prev) => ({ ...prev, [name]: value }))
                }} 
            />

            <div className="sm:col-span-9"></div>
            <div className="sm:col-span-3 flex gap-2 justify-end-safe">
                <Button type="button" variant="ghost" onClick={() => {
                    setDetails(defaultDetails)
                }} className="text-sm" disabled={isSubmitting}>Clear</Button>
                <Button type="button" variant="primary" onClick={handleCreate} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add"}
                </Button>
            </div>
        </div>
    )
}

export default AddBill

