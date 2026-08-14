import Button from "../UI/Button"
import { useState } from "react"
import type { ScheduleDetails } from "./Types"
import ScheduleFormFields from "./ScheduleFormFields"
import { updateSchedule } from "../../API/schedulesAPI"

type ScheduleUpdateProps = {
    existingDetails: ScheduleDetails
    refreshTableFunction: () => Promise<any>
}

function UpdateSchedule({ existingDetails, refreshTableFunction }: ScheduleUpdateProps) {
    const [details, setDetails] = useState<ScheduleDetails>({
        ...existingDetails,
        dueDate: existingDetails.dueDate ? String(existingDetails.dueDate).split("T")[0] : ""
    })

    async function handleUpdate() {
        try {
            const dataToSubmit = {
                ...details,
                amount: Number(details.amount),
                loanID: details.loanID ? details.loanID : null,
                billID: details.billID ? details.billID : null,
                incomeID: details.incomeID ? details.incomeID : null
            }
            await updateSchedule(details.scheduleID, dataToSubmit)
            refreshTableFunction()
        } catch (error) {
            console.error("Failed to update schedule details", error)
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
                }} className="text-sm">Reset</Button>
                <Button type="button" variant="primary" onClick={handleUpdate} className="text-sm">Update</Button>
            </div>
        </div>
    )
}

export default UpdateSchedule
