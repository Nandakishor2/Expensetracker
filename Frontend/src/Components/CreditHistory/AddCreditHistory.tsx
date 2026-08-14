import Button from "../UI/Button"
import { useState } from "react"
import type { CreateCreditHistory } from "./Types"
import CreditHistoryFormFields from "./CreditHistoryFormFields"
import { createCreditHistory } from "../../API/creditHistoryAPI"

type AddCreditHistoryProps = {
    refreshTableFunction: () => Promise<any>
}

function AddCreditHistory({ refreshTableFunction }: AddCreditHistoryProps) {
    const defaultDetails: CreateCreditHistory = {
        peopleID: "",
        purpose: "",
        creditPaymentMode: "",
        recievedDate: new Date().toISOString().split("T")[0],
        dueDate: new Date().toISOString().split("T")[0],
        dueClearedDate: "",
        repaymentMode: "",
        dueCleared: false
    }

    const [details, setDetails] = useState<CreateCreditHistory>(defaultDetails)

    const handleCreate = async () => {
        try {
            const dataToSubmit = {
                ...details,
                dueClearedDate: details.dueCleared ? details.dueClearedDate : null,
                repaymentMode: details.dueCleared ? details.repaymentMode : null
            }
            await createCreditHistory(dataToSubmit)
            setDetails(defaultDetails)
            refreshTableFunction()
        } catch (error) {
            console.error("Failed to create credit history", error)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <CreditHistoryFormFields 
                creditHistoryDetails={details}
                onChange={(e) => {
                    const { name, value } = e.target
                    setDetails((prev) => ({ ...prev, [name]: value }))
                }} 
            />

            <div className="sm:col-span-9"></div>
            <div className="sm:col-span-3 flex gap-2 justify-end-safe">
                <Button type="button" variant="ghost" onClick={() => {
                    setDetails(defaultDetails)
                }} className="text-sm">Clear</Button>
                <Button type="button" variant="primary" onClick={handleCreate} className="text-sm">Add</Button>
            </div>
        </div>
    )
}

export default AddCreditHistory
