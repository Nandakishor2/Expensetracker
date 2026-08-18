import Button from "../UI/Button"
import { useState } from "react"
import type { CreateSchedule } from "./Types"
import ScheduleFormFields from "./ScheduleFormFields"
import { createSchedule } from "../../API/schedulesAPI"
import { useAPIResponse } from "../../Context/APIResponse"

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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    const handleCreate = async () => {
        setIsSubmitting(true)
        try {
            const dataToSubmit = {
                ...details,
                amount: Number(details.amount),
                loanID: details.loanID ? details.loanID : null,
                billID: details.billID ? details.billID : null,
                incomeID: details.incomeID ? details.incomeID : null
            }
            const res = await createSchedule(dataToSubmit)
            showSuccess(res.message || "Schedule added successfully", 3000)
            setDetails(defaultDetails)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to create schedule")
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
                    setDetails(defaultDetails)
                }} className="text-sm" disabled={isSubmitting}>Clear</Button>
                <Button type="button" variant="primary" onClick={handleCreate} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add"}
                </Button>
            </div>
        </div>
    )
}

export default AddSchedule

