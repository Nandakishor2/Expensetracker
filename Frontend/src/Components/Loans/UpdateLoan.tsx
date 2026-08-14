import Button from "../UI/Button"
import { useState } from "react"
import type { loanDetails } from "./Types"
import LoanFormFields from "./LoanFormFields"
import { updateLoanDetails } from "../../API/LoansAPI"

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

    async function funcUpdateLoanDetails() {
        try {
            const dataToSubmit = {
                ...loanDetails,
                loanAmount: Number(loanDetails.loanAmount),
                emiDate: Number(loanDetails.emiDate),
                rateOfIntrest: Number(loanDetails.rateOfIntrest),
                emiAmount: Number(loanDetails.emiAmount),
                endDate: loanDetails.endDate ? loanDetails.endDate : null
            }
            await updateLoanDetails(loanDetails.loanID, dataToSubmit)
            refreshTableFunction()
        } catch (error) {
            console.error("Failed to update loan details", error)
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
                }} className="text-sm">Reset</Button>
                <Button type="button" variant="primary" onClick={funcUpdateLoanDetails} className="text-sm">Update</Button>
            </div>
        </div>
    )
}

export default UpdateLoan
