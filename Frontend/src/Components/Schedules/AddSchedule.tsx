import Button from "../UI/Button"
import { useState } from "react"
import type { CreateSchedule } from "./Types"
import ScheduleFormFields from "./ScheduleFormFields"
import { createSchedule } from "../../API/schedulesAPI"

type AddScheduleProps = {
    refreshTableFunction: () => Promise<any>
}

function AddSchedule({ refreshTableFunction }: AddScheduleProps) {
    const defaultDetails: CreateSchedule = {
        name: "",
        description: "",
        dueDate: new Date().toISOString().split("T")[0],
        loanID: "",
        billID: "",
        incomeID: "",
        transactionType: "credit",
        amount: 0,
        sessionStatus: "pending"
    }

    const [details, setDetails] = useState<CreateSchedule>(defaultDetails)

    const handleCreate = async () => {
        try {
            const dataToSubmit = {
                ...details,
                amount: Number(details.amount),
                loanID: details.loanID ? details.loanID : null,
                billID: details.billID ? details.billID : null,
                incomeID: details.incomeID ? details.incomeID : null
            }
            await createSchedule(dataToSubmit)
            setDetails(defaultDetails)
            refreshTableFunction()
        } catch (error) {
            console.error("Failed to create schedule", error)
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
                    setDetails(defaultDetails)
                }} className="text-sm">Clear</Button>
                <Button type="button" variant="primary" onClick={handleCreate} className="text-sm">Add</Button>
            </div>
        </div>
    )
}

export default AddSchedule
