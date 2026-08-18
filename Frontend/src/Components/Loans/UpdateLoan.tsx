import Button from "../UI/Button"
import { useState, useEffect } from "react"
import type { loanDetails } from "./Types"
import LoanFormFields from "./LoanFormFields"
import { updateLoanDetails } from "../../API/LoansAPI"
import { useAPIResponse } from "../../Context/APIResponse"

type LoanUpdateProps = {
    existingLoanDetails: loanDetails
    refreshTableFunction: () => Promise<any>
}

function UpdateLoan({ existingLoanDetails, refreshTableFunction }: LoanUpdateProps) {
    const [loanDetails, setLoanDetails] = useState<loanDetails>({
        ...existingLoanDetails,
        // Ensure dates are string formatted for HTML date inputs
        startDate: existingLoanDetails.startDate ? String(existingLoanDetails.startDate).split("T")[0] : "",
        endDate: existingLoanDetails.endDate ? String(existingLoanDetails.endDate).split("T")[0] : ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    useEffect(() => {
        setLoanDetails({
            ...existingLoanDetails,
            startDate: existingLoanDetails.startDate ? String(existingLoanDetails.startDate).split("T")[0] : "",
            endDate: existingLoanDetails.endDate ? String(existingLoanDetails.endDate).split("T")[0] : ""
        })
    }, [existingLoanDetails])

    async function funcUpdateLoanDetails() {
        setIsSubmitting(true)
        try {
            const dataToSubmit = {
                ...loanDetails,
                loanAmount: Number(loanDetails.loanAmount),
                emiDate: Number(loanDetails.emiDate),
                rateOfIntrest: Number(loanDetails.rateOfIntrest),
                emiAmount: Number(loanDetails.emiAmount),
                endDate: loanDetails.endDate ? loanDetails.endDate : null
            }
            const res = await updateLoanDetails(loanDetails.loanID, dataToSubmit)
            showSuccess(res.message || "Loan updated successfully", 3000)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to update loan details")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <LoanFormFields 
                loanDetails={loanDetails}
                isEditMode={true}
                onChange={(e) => {
                    const { name, value } = e.target
                    setLoanDetails((prev) => ({ ...prev, [name]: value }))
                }} 
            />

            <div className="sm:col-span-9"></div>
            <div className="sm:col-span-3 flex gap-2 justify-end-safe">
                <Button type="button" variant="ghost" onClick={() => {
                    setLoanDetails({
                        ...existingLoanDetails,
                        startDate: existingLoanDetails.startDate ? String(existingLoanDetails.startDate).split("T")[0] : "",
                        endDate: existingLoanDetails.endDate ? String(existingLoanDetails.endDate).split("T")[0] : ""
                    })
                }} className="text-sm" disabled={isSubmitting}>Reset</Button>
                <Button type="button" variant="primary" onClick={funcUpdateLoanDetails} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                </Button>
            </div>
        </div>
    )
}

export default UpdateLoan

