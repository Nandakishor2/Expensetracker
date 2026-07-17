import { useState, type ChangeEvent } from "react"
import LoanFormFields from "./LoanFormFields"
import type { loanDetails } from "./Types"

function AddLoan() {
    const defaultLoanDetails: loanDetails = {
        loanID: "",
        accountID: "",
        companyName: "",
        purpose: "",
        loanAmount: 0,
        startDate: new Date(),
        endDate: new Date(),
        emiDate: 0,
        rateOfIntrest: 0,
        emiAmount: 0,
        activeStatus: true
    }
    const [loanDetails, setLoanDetails] = useState<loanDetails>(defaultLoanDetails)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setLoanDetails({
            ...loanDetails,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <LoanFormFields loanDetails={loanDetails} onChange={handleChange} />
        </div>
    )
}

export default AddLoan
