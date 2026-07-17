import Button from "../UI/Button"
import { useState } from "react"
import type { AccountDetails } from "./Types"
import AccountFormFields from "./AccountFormFields"
import { updateAccountDetails } from "../../API/accountAPI"

type AccountUpdateProps = {
    existingAccountDetails: AccountDetails,
    refreshTableFunction: () => Promise<any>
}

function UpdateAccount({ existingAccountDetails, refreshTableFunction }: AccountUpdateProps) {
    const defaultAccountDetails: AccountDetails = {
        accountID: "",
        bankName: "",
        accountType: "savings",
        ifscCode: "",
        closingBalance: 0.0
    }
    const [accountDetails, setAccountDetails] = useState<AccountDetails>(existingAccountDetails)

    async function funcUpdateAccountDetails() {
        try {

            await updateAccountDetails(accountDetails)
            refreshTableFunction()

        }
        catch (error) {
            console.error(error)
        }
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
                <Button type="button" variant="primary" onClick={() => {
                    funcUpdateAccountDetails()
                }} className="text-sm">Update</Button>
            </div>
        </div>
    )
}

export default UpdateAccount