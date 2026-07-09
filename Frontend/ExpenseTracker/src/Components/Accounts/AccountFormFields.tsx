import type { ChangeEvent } from "react"
import type { AccountDetails } from "./Types"
import SelectGroup from "../Forms/SelectGroup"
import TextGroup from "../Forms/TextGroup"
type accountFormData = {
    accountDetails: AccountDetails
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function AccountFormFields({ accountDetails, onChange }: accountFormData) {
    return (
        <>
            {/* Row 1 */}
            <div className="sm:col-span-4">
                <TextGroup id="txtBankName"
                    name="bankName"
                    labelName="BANK NAME"
                    value={accountDetails.bankName}
                    placeholder="Please provide your bank name"
                    onChange={onChange} />
            </div>
            <div className="sm:col-span-4">
                <TextGroup id="txtIfsc"
                    name="ifscCode"
                    labelName="IFSC CODE"
                    value={accountDetails.ifscCode}
                    placeholder="Please provide your ifsc code"
                    onChange={onChange} />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup id="drpAccountType"
                    name="accountType"
                    labelName="ACCOUNT TYPE"
                    value={accountDetails.accountType}
                    dropdownItems={{ "": "Select Account", "savings": "Savings", "current": "Current" }}
                    onChange={onChange} />
            </div>
            {/* Row 2 */}
            <div className="sm:col-span-4">
                <TextGroup id="txtAccountNumber"
                    name="accountID"
                    labelName="ACCOUNT NUMBER"
                    value={String(accountDetails.accountID)}
                    placeholder="Please provide your account number"
                    onChange={onChange} />
            </div>
            <div className="sm:col-span-4">
                <TextGroup id="txtClosingBalance"
                    name="closingBalance"
                    labelName="CLOSING BALANCE"
                    value={String(accountDetails.closingBalance)}
                    placeholder="Please provide your closing balance"
                    type="number"
                    onChange={onChange} />
            </div>
            <div className="sm:col-span-4"></div>
        </>
    )
}

export default AccountFormFields