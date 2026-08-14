import Button from "../UI/Button"
import { useState } from "react"
import type { CreateBills } from "./Types"
import BillFormFields from "./BillFormFields"
import { createBill } from "../../API/billsAPI"

type AddBillProps = {
    refreshTableFunction: () => Promise<any>
}

function AddBill({ refreshTableFunction }: AddBillProps) {
    const defaultDetails: CreateBills = {
        organization: "",
        description: "",
        dueDate: new Date().toISOString().split("T")[0]
    }

    const [details, setDetails] = useState<CreateBills>(defaultDetails)

    const handleCreate = async () => {
        try {
            await createBill(details)
            setDetails(defaultDetails)
            refreshTableFunction()
        } catch (error) {
            console.error("Failed to create bill", error)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <BillFormFields 
                billDetails={details}
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

export default AddBill
