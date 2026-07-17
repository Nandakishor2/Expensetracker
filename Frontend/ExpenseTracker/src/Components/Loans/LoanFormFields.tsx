import type { ChangeEvent } from "react"
import TextGroup from "../Forms/TextGroup"
import type { loanDetails } from "./Types"

type AddLoansprops = {
    loanDetails: loanDetails
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}
function LoanFormFields({ loanDetails, onChange }: AddLoansprops) {
    return (
        <>
            {/* Row 1 */}
            <div className="sm:col-span-3">
                <TextGroup id="txtLoanID"
                    name="loanID"
                    labelName="LOAN ID"
                    value={loanDetails.loanID}
                    placeholder="Please provide your loan ID"
                    onChange={onChange} />
            </div>
            <div className="sm:col-span-3">
                <TextGroup id="txtAccountID"
                    name="accountID"
                    labelName="ACCOUNT ID"
                    value={loanDetails.accountID}
                    placeholder="Please provide your account ID"
                    onChange={onChange} />
            </div>
            <div className="sm:col-span-3">
                <TextGroup id="txtCompanyName"
                    name="companyName"
                    labelName="COMPANY NAME"
                    value={loanDetails.companyName}
                    placeholder="Please provide your company name"
                    onChange={onChange} />
            </div>
            <div className="sm:col-span-3">
                <TextGroup id="txtLoanAmount"
                    name="loanAmount"
                    labelName="LOAN AMOUNT"
                    value={String(loanDetails.loanAmount)}
                    placeholder="Please provide your loan amount"
                    onChange={onChange} />
            </div>

            {/* Row 2 */}

            <div className="sm:col-span-4">
                <TextGroup id="txtPurpose"
                    name="purpose"
                    labelName="PURPOSE"
                    value={loanDetails.purpose}
                    placeholder="Please provide your loan purpose"
                    onChange={onChange} />
            </div>

        </>
    )
}

export default LoanFormFields