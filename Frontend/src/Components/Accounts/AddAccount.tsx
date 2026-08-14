import Button from "../UI/Button"
import { useState } from "react"
import type { AccountDetails } from "./Types"
import AccountFormFields from "./AccountFormFields"
import { createAccount } from "../../API/accountAPI"

type AddAccountProps = {
    refreshTableFunction: () => Promise<any>
}

function AddAccount({ refreshTableFunction }: AddAccountProps) {

    const defaultAccountDetails: AccountDetails = {
        accountID: "",
        bankName: "",
        accountType: "savings",
        ifscCode: "",
        closingBalance: 0.0,

    }
    const [accountDetails, setAccountDetails] = useState<AccountDetails>(defaultAccountDetails)

    const handleCreateAccount = async () => {
        await createAccount(accountDetails)
        refreshTableFunction()
    }
    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <AccountFormFields accountDetails={accountDetails}
                onChange={(e) => {
                    const { name, value } = e.target
                    setAccountDetails((prev) => ({ ...prev, [name]: value }))
                }} />

            <div className="sm:col-span-9">
            </div>
            <div className="sm:col-span-3 flex gap-2 justify-end-safe">
                <Button type="button" variant="ghost" onClick={() => {
                    setAccountDetails(defaultAccountDetails)
                }} className="text-sm">Clear</Button>
                <Button type="button" variant="primary" onClick={handleCreateAccount} className="text-sm">Add</Button>
            </div>
        </div>
    )
}

export default AddAccount