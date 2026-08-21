import Button from "../UI/Button"
import { useState } from "react"
import type { CreateCreditHistory } from "./Types"
import CreditHistoryFormFields from "./CreditHistoryFormFields"
import { createCreditHistory } from "../../API/creditHistoryAPI"
import { useAPIResponse } from "../../Context/APIResponse"

type AddCreditHistoryProps = {
    refreshTableFunction: () => Promise<any>
}

function AddCreditHistory({ refreshTableFunction }: AddCreditHistoryProps) {
    const defaultDetails: CreateCreditHistory = {
        peopleID: "",
        purpose: "",
        amount: 0,
        creditPaymentMode: "",
        recievedDate: new Date().toISOString().split("T")[0],
        dueDate: new Date().toISOString().split("T")[0],
        dueClearedDate: "",
        repaymentMode: "",
        dueCleared: false
    }

    const [details, setDetails] = useState<CreateCreditHistory>(defaultDetails)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    const handleCreate = async () => {
        setIsSubmitting(true)
        try {
            const dataToSubmit = {
                ...details,
                dueClearedDate: details.dueCleared ? details.dueClearedDate : null,
                repaymentMode: details.dueCleared ? details.repaymentMode : null
            }
            const res = await createCreditHistory(dataToSubmit)
            showSuccess(res.message || "Credit History added successfully", 3000)
            setDetails(defaultDetails)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to create credit history")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <CreditHistoryFormFields 
                creditHistoryDetails={details}
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

export default AddCreditHistory
