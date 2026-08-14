import type { ChangeEvent } from "react"
import type { BillDetails } from "./Types"
import TextGroup from "../Forms/TextGroup"

type BillFormFieldsProps = {
    billDetails: Partial<BillDetails>
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function BillFormFields({ billDetails, onChange }: BillFormFieldsProps) {
    return (
        <>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtOrganization"
                    name="organization"
                    labelName="ORGANIZATION"
                    value={billDetails.organization || ""}
                    placeholder="E.g. Electricity Board, Water Dept"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtDescription"
                    name="description"
                    labelName="DESCRIPTION"
                    value={billDetails.description || ""}
                    placeholder="E.g. July electricity bill, Internet subscription"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <TextGroup 
                    id="txtDueDate"
                    name="dueDate"
                    labelName="DUE DATE"
                    value={billDetails.dueDate ? String(billDetails.dueDate).split("T")[0] : ""}
                    type="date"
                    onChange={onChange}
                />
            </div>
        </>
    )
}

export default BillFormFields
