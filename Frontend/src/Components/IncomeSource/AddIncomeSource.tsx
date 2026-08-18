import Button from "../UI/Button"
import { useState } from "react"
import type { CreateIncomeSource } from "./Types"
import IncomeSourceFormFields from "./IncomeSourceFormFields"
import { createIncomeSource } from "../../API/incomeSourceAPI"
import { useAPIResponse } from "../../Context/APIResponse"

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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    const handleCreate = async () => {
        setIsSubmitting(true)
        try {
            const dataToSubmit = {
                ...details,
                amount: Number(details.amount),
                endDate: details.endDate ? details.endDate : null
            }
            const res = await createIncomeSource(dataToSubmit)
            showSuccess(res.message || "Income source added successfully", 3000)
            setDetails(defaultDetails)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to create income source")
        } finally {
            setIsSubmitting(false)
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
                }} className="text-sm" disabled={isSubmitting}>Clear</Button>
                <Button type="button" variant="primary" onClick={handleCreate} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add"}
                </Button>
            </div>
        </div>
    )
}

export default AddIncomeSource

