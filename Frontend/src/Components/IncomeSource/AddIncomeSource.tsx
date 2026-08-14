import Button from "../UI/Button"
import { useState } from "react"
import type { CreateIncomeSource } from "./Types"
import IncomeSourceFormFields from "./IncomeSourceFormFields"
import { createIncomeSource } from "../../API/incomeSourceAPI"

type AddIncomeSourceProps = {
    refreshTableFunction: () => Promise<any>
}

function AddIncomeSource({ refreshTableFunction }: AddIncomeSourceProps) {
    const defaultDetails: CreateIncomeSource = {
        sourceName: "",
        creditedDate: new Date().toISOString().split("T")[0],
        amount: 0,
        accountID: "",
        incomeSourceStatus: true,
        startDate: new Date().toISOString().split("T")[0],
        endDate: ""
    }

    const [details, setDetails] = useState<CreateIncomeSource>(defaultDetails)

    const handleCreate = async () => {
        try {
            const dataToSubmit = {
                ...details,
                amount: Number(details.amount),
                endDate: details.endDate ? details.endDate : null
            }
            await createIncomeSource(dataToSubmit)
            setDetails(defaultDetails)
            refreshTableFunction()
        } catch (error) {
            console.error("Failed to create income source", error)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <IncomeSourceFormFields 
                incomeSourceDetails={details}
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

export default AddIncomeSource
