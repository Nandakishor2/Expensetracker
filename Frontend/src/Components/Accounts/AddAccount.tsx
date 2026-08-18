import Button from "../UI/Button"
import { useState } from "react"
import type { AccountDetails } from "./Types"
import AccountFormFields from "./AccountFormFields"
import { createAccount } from "../../API/accountAPI"
import { useAPIResponse } from "../../Context/APIResponse"

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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    const handleCreateAccount = async () => {
        setIsSubmitting(true)
        try {
            const res = await createAccount(accountDetails)
            showSuccess(res.message || "Account created successfully", 3000)
            setAccountDetails(defaultAccountDetails)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to create account")
        } finally {
            setIsSubmitting(false)
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
                }} className="text-sm" disabled={isSubmitting}>Clear</Button>
                <Button type="button" variant="primary" onClick={handleCreateAccount} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add"}
                </Button>
            </div>
        </div>
    )
}

export default AddAccount