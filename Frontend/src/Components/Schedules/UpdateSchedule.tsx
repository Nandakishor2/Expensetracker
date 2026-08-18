import Button from "../UI/Button"
import { useState, useEffect } from "react"
import type { ScheduleDetails } from "./Types"
import ScheduleFormFields from "./ScheduleFormFields"
import { updateSchedule } from "../../API/schedulesAPI"
import { useAPIResponse } from "../../Context/APIResponse"

type ScheduleUpdateProps = {
    existingDetails: ScheduleDetails
    refreshTableFunction: () => Promise<any>
}

function UpdateSchedule({ existingDetails, refreshTableFunction }: ScheduleUpdateProps) {
    const [details, setDetails] = useState<ScheduleDetails>({
        ...existingDetails,
        dueDate: existingDetails.dueDate ? String(existingDetails.dueDate).split("T")[0] : ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    useEffect(() => {
        setDetails({
            ...existingDetails,
            dueDate: existingDetails.dueDate ? String(existingDetails.dueDate).split("T")[0] : ""
        })
    }, [existingDetails])

    async function handleUpdate() {
        setIsSubmitting(true)
        try {
            const dataToSubmit = {
                ...details,
                amount: Number(details.amount),
                loanID: details.loanID ? details.loanID : null,
                billID: details.billID ? details.billID : null,
                incomeID: details.incomeID ? details.incomeID : null
            }
            const res = await updateSchedule(details.scheduleID, dataToSubmit)
            showSuccess(res.message || "Schedule updated successfully", 3000)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to update schedule details")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <ScheduleFormFields 
                scheduleDetails={details}
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
                        dueDate: existingDetails.dueDate ? String(existingDetails.dueDate).split("T")[0] : ""
                    })
                }} className="text-sm" disabled={isSubmitting}>Reset</Button>
                <Button type="button" variant="primary" onClick={handleUpdate} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Update"}
                </Button>
            </div>
        </div>
    )
}

export default UpdateSchedule

