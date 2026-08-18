import Button from "../UI/Button"
import { useState } from "react"
import type { loanDetails } from "./Types"
import LoanFormFields from "./LoanFormFields"
import { createLoanDetails } from "../../API/LoansAPI"
import { useAPIResponse } from "../../Context/APIResponse"

type AddLoanProps = {
    refreshTableFunction: () => Promise<any>
}

function AddLoan({ refreshTableFunction }: AddLoanProps) {
    const defaultLoanDetails: loanDetails = {
        loanID: "",
        accountID: "",
        companyName: "",
        purpose: "",
        loanAmount: 0,
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        emiDate: 0,
        rateOfIntrest: 0,
        emiAmount: 0,
        activeStatus: true
    }

    const [loanDetails, setLoanDetails] = useState<loanDetails>(defaultLoanDetails)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    const handleCreateLoan = async () => {
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
            const res = await createLoanDetails(dataToSubmit)
            showSuccess(res.message || "Loan added successfully", 3000)
            setLoanDetails(defaultLoanDetails)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to create loan")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <LoanFormFields 
                loanDetails={loanDetails}
                onChange={(e) => {
                    const { name, value } = e.target
                    setLoanDetails((prev) => ({ ...prev, [name]: value }))
                }} 
            />

            <div className="sm:col-span-9"></div>
            <div className="sm:col-span-3 flex gap-2 justify-end-safe">
                <Button type="button" variant="ghost" onClick={() => {
                    setLoanDetails(defaultLoanDetails)
                }} className="text-sm" disabled={isSubmitting}>Clear</Button>
                <Button type="button" variant="primary" onClick={handleCreateLoan} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add"}
                </Button>
            </div>
        </div>
    )
}

export default AddLoan

