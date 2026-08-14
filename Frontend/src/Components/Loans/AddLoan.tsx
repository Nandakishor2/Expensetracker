import Button from "../UI/Button"
import { useState } from "react"
import type { loanDetails } from "./Types"
import LoanFormFields from "./LoanFormFields"
import { createLoanDetails } from "../../API/LoansAPI"

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

    const handleCreateLoan = async () => {
        try {
            const dataToSubmit = {
                ...loanDetails,
                loanAmount: Number(loanDetails.loanAmount),
                emiDate: Number(loanDetails.emiDate),
                rateOfIntrest: Number(loanDetails.rateOfIntrest),
                emiAmount: Number(loanDetails.emiAmount),
                endDate: loanDetails.endDate ? loanDetails.endDate : null
            }
            await createLoanDetails(dataToSubmit)
            setLoanDetails(defaultLoanDetails)
            refreshTableFunction()
        } catch (error) {
            console.error("Failed to create loan", error)
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
                }} className="text-sm">Clear</Button>
                <Button type="button" variant="primary" onClick={handleCreateLoan} className="text-sm">Add</Button>
            </div>
        </div>
    )
}

export default AddLoan
