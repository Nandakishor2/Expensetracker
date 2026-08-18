import Button from "../UI/Button"
import { useState, useEffect } from "react"
import type { IncomeSourceDetails } from "./Types"
import IncomeSourceFormFields from "./IncomeSourceFormFields"
import { updateIncomeSource } from "../../API/incomeSourceAPI"
import { useAPIResponse } from "../../Context/APIResponse"

type IncomeSourceUpdateProps = {
    existingDetails: IncomeSourceDetails
    refreshTableFunction: () => Promise<any>
}

function UpdateIncomeSource({ existingDetails, refreshTableFunction }: IncomeSourceUpdateProps) {
    const [details, setDetails] = useState<IncomeSourceDetails>({
        ...existingDetails,
        creditedDate: existingDetails.creditedDate ? String(existingDetails.creditedDate).split("T")[0] : "",
        startDate: existingDetails.startDate ? String(existingDetails.startDate).split("T")[0] : "",
        endDate: existingDetails.endDate ? String(existingDetails.endDate).split("T")[0] : ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    useEffect(() => {
        setDetails({
            ...existingDetails,
            creditedDate: existingDetails.creditedDate ? String(existingDetails.creditedDate).split("T")[0] : "",
            startDate: existingDetails.startDate ? String(existingDetails.startDate).split("T")[0] : "",
            endDate: existingDetails.endDate ? String(existingDetails.endDate).split("T")[0] : ""
        })
    }, [existingDetails])

    async function handleUpdate() {
        setIsSubmitting(true)
        try {
            const dataToSubmit = {
                ...details,
                amount: Number(details.amount),
                endDate: details.endDate ? details.endDate : null
            }
            const res = await updateIncomeSource(details.incomeID, dataToSubmit)
            showSuccess(res.message || "Income source updated successfully", 3000)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to update income source details")
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
                    setDetails({
                        ...existingDetails,
                        creditedDate: existingDetails.creditedDate ? String(existingDetails.creditedDate).split("T")[0] : "",
                        startDate: existingDetails.startDate ? String(existingDetails.startDate).split("T")[0] : "",
                        endDate: existingDetails.endDate ? String(existingDetails.endDate).split("T")[0] : ""
                    })
                }} className="text-sm" disabled={isSubmitting}>Reset</Button>
                <Button type="button" variant="primary" onClick={handleUpdate} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                </Button>
            </div>
        </div>
    )
}

export default UpdateIncomeSource

