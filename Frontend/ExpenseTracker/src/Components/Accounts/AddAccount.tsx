import SelectGroup from "../Forms/SelectGroup"
import TextGroup from "../Forms/TextGroup"
import Button from "../UI/Button"
import { useState } from "react"

function AddAccount() {
    const [accountType, setAccountType] = useState<string>("")
    const [closingBalance, setClosingBalance] = useState<number>(0.0)
    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            {/* Row 1 */}
            <div className="sm:col-span-4">
                <TextGroup id="txtBankName"
                    name="txtBankName"
                    labelName="BANK NAME"
                    value=""
                    placeholder="Please provide your bank name"
                    onChange={() => { }} />
            </div>
            <div className="sm:col-span-4">
                <TextGroup id="txtIfsc"
                    name="txtIfsc"
                    labelName="IFSC CODE"
                    value=""
                    placeholder="Please provide your ifsc code"
                    onChange={() => { }} />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup id="drpAccountType"
                    name="drpAccountType"
                    labelName="ACCOUNT TYPE"
                    value={accountType}
                    dropdownItems={{ "": "Select Account", "savings": "Savings", "current": "Current" }}
                    onChange={(e) => {
                        setAccountType(e.target.value)
                    }} />
            </div>
            {/* Row 2 */}
            <div className="sm:col-span-4">
                <TextGroup id="txtAccountNumber"
                    name="txtAccountNumber"
                    labelName="ACCOUNT NUMBER"
                    value=""
                    placeholder="Please provide your account number"
                    onChange={() => { }} />
            </div>
            <div className="sm:col-span-4">
                <TextGroup id="txtClosingBalance"
                    name="txtClosingBalance"
                    labelName="CLOSING BALANCE"
                    value={String(closingBalance)}
                    placeholder="Please provide your closing balance"
                    type="number"
                    onChange={(e) => {
                        setClosingBalance(Number(e.target.value))
                    }} />
            </div>
            <div className="sm:col-span-4"></div>
            {/* Row 3 */}
            <div className="sm:col-span-9">
            </div>
            <div className="sm:col-span-3 flex gap-2 justify-end-safe">
                <Button type="button" variant="ghost" className="text-sm">Clear</Button>
                <Button type="button" variant="primary" className="text-sm">Add Account</Button>
            </div>
        </div>
    )
}

export default AddAccount