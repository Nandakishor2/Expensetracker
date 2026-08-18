import Button from "../UI/Button"
import { useState, useEffect } from "react"
import type { CreditHistoryDetails } from "./Types"
import CreditHistoryFormFields from "./CreditHistoryFormFields"
import { updateCreditHistory } from "../../API/creditHistoryAPI"
import { useAPIResponse } from "../../Context/APIResponse"

type CreditHistoryUpdateProps = {
    existingDetails: CreditHistoryDetails
    refreshTableFunction: () => Promise<any>
}

function UpdateCreditHistory({ existingDetails, refreshTableFunction }: CreditHistoryUpdateProps) {
    const [details, setDetails] = useState<CreditHistoryDetails>({
        ...existingDetails,
        recievedDate: existingDetails.recievedDate ? String(existingDetails.recievedDate).split("T")[0] : "",
        dueDate: existingDetails.dueDate ? String(existingDetails.dueDate).split("T")[0] : "",
        dueClearedDate: existingDetails.dueClearedDate ? String(existingDetails.dueClearedDate).split("T")[0] : ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    useEffect(() => {
        setDetails({
            ...existingDetails,
            recievedDate: existingDetails.recievedDate ? String(existingDetails.recievedDate).split("T")[0] : "",
            dueDate: existingDetails.dueDate ? String(existingDetails.dueDate).split("T")[0] : "",
            dueClearedDate: existingDetails.dueClearedDate ? String(existingDetails.dueClearedDate).split("T")[0] : ""
        })
    }, [existingDetails])

    async function handleUpdate() {
        setIsSubmitting(true)
        try {
            const dataToSubmit = {
                ...details,
                dueClearedDate: details.dueCleared ? details.dueClearedDate : null,
                repaymentMode: details.dueCleared ? details.repaymentMode : null
            }
            const res = await updateCreditHistory(details.creditHistoryID, dataToSubmit)
            showSuccess(res.message || "Credit History updated successfully", 3000)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to update credit history details")
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
                    setDetails({
                        ...existingDetails,
                        recievedDate: existingDetails.recievedDate ? String(existingDetails.recievedDate).split("T")[0] : "",
                        dueDate: existingDetails.dueDate ? String(existingDetails.dueDate).split("T")[0] : "",
                        dueClearedDate: existingDetails.dueClearedDate ? String(existingDetails.dueClearedDate).split("T")[0] : ""
                    })
                }} className="text-sm" disabled={isSubmitting}>Reset</Button>
                <Button type="button" variant="primary" onClick={handleUpdate} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                </Button>
            </div>
        </div>
    )
}

export default UpdateCreditHistory

