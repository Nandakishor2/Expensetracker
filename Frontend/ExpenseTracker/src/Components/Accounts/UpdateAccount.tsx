import Button from "../UI/Button"
import { useState } from "react"
import type { AccountDetails } from "./Types"
import AccountFormFields from "./AccountFormFields"

type AccountUpdateProps = {
    existingAccountDetails: AccountDetails
}

function UpdateAccount({ existingAccountDetails }: AccountUpdateProps) {
    const defaultAccountDetails: AccountDetails = {
        accountID: "",
        bankName: "",
        accountType: "Savings",
        ifscCode: "",
        closingBalance: 0.0,
        createdDate: "",
        updatedDate: ""
    }
    const [accountDetails, setAccountDetails] = useState<AccountDetails>(existingAccountDetails)

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
                    console.log("Account Update", accountDetails)
                }} className="text-sm">Update</Button>
            </div>
        </div>
    )
}

export default UpdateAccount