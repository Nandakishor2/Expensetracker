import Button from "../UI/Button"
import { useState } from "react"
import type { CreateTransaction } from "./Types"
import TransactionFormFields from "./TransactionFormFields"
import { createTransaction } from "../../API/transactionsAPI"

type AddTransactionProps = {
    refreshTableFunction: () => Promise<any>
}

function AddTransaction({ refreshTableFunction }: AddTransactionProps) {
    const defaultDetails: CreateTransaction = {
        category: "other",
        description: "",
        transactionDate: new Date().toISOString().split("T")[0],
        scheduleID: "",
        loanID: "",
        billID: "",
        incomeID: "",
        transactionType: "debit",
        amount: 0
    }

    const [details, setDetails] = useState<CreateTransaction>(defaultDetails)

    const handleCreate = async () => {
        try {
            const dataToSubmit = {
                ...details,
                amount: Number(details.amount),
                scheduleID: details.scheduleID ? details.scheduleID : null,
                loanID: details.loanID ? details.loanID : null,
                billID: details.billID ? details.billID : null,
                incomeID: details.incomeID ? details.incomeID : null
            }
            await createTransaction(dataToSubmit)
            setDetails(defaultDetails)
            refreshTableFunction()
        } catch (error) {
            console.error("Failed to create transaction", error)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <TransactionFormFields 
                transactionDetails={details}
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

export default AddTransaction
