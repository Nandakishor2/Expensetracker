import Button from "../UI/Button"
import { useState, useEffect } from "react"
import type { TransactionDetails } from "./Types"
import TransactionFormFields from "./TransactionFormFields"
import { updateTransaction } from "../../API/transactionsAPI"
import { useAPIResponse } from "../../Context/APIResponse"

type TransactionUpdateProps = {
    existingDetails: TransactionDetails
    refreshTableFunction: () => Promise<any>
}

function UpdateTransaction({ existingDetails, refreshTableFunction }: TransactionUpdateProps) {
    const [details, setDetails] = useState<TransactionDetails>({
        ...existingDetails,
        transactionDate: existingDetails.transactionDate ? String(existingDetails.transactionDate).split("T")[0] : ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    useEffect(() => {
        setDetails({
            ...existingDetails,
            transactionDate: existingDetails.transactionDate ? String(existingDetails.transactionDate).split("T")[0] : ""
        })
    }, [existingDetails])

    async function handleUpdate() {
        setIsSubmitting(true)
        try {
            const dataToSubmit = {
                ...details,
                amount: Number(details.amount),
                scheduleID: details.scheduleID ? details.scheduleID : null,
                loanID: details.loanID ? details.loanID : null,
                billID: details.billID ? details.billID : null,
                incomeID: details.incomeID ? details.incomeID : null
            }
            const res = await updateTransaction(details.transactionID, dataToSubmit)
            showSuccess(res.message || "Transaction updated successfully", 3000)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to update transaction details")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <TransactionFormFields 
                transactionDetails={details}
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
                        transactionDate: existingDetails.transactionDate ? String(existingDetails.transactionDate).split("T")[0] : ""
                    })
                }} className="text-sm" disabled={isSubmitting}>Reset</Button>
                <Button type="button" variant="primary" onClick={handleUpdate} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                </Button>
            </div>
        </div>
    )
}

export default UpdateTransaction

