import type { BillDetails } from "./Types"
import TextGroup from "../Forms/TextGroup"
import SelectGroup from "../Forms/SelectGroup"

type BillFormFieldsProps = {
    billDetails: Partial<BillDetails>
    onChange: (e: any) => void
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
                    labelName="DUE DATE (DAY OF MONTH)"
                    value={billDetails.dueDate !== undefined ? String(billDetails.dueDate) : ""}
                    placeholder="E.g. 15 for the 15th of the month"
                    type="number"
                    onChange={onChange}
                />
            </div>
            <div className="sm:col-span-4">
                <SelectGroup 
                    id="drpIsActive"
                    name="isActive"
                    labelName="STATUS"
                    value={String(billDetails.isActive ?? "true")}
                    dropdownItems={{ "true": "Active", "false": "Inactive" }}
                    onChange={(e) => {
                        const val = e.target.value === "true"
                        onChange({
                            ...e,
                            target: {
                                ...e.target,
                                name: "isActive",
                                value: val as any
                            }
                        })
                    }}
                />
            </div>
        </>
    )
}

export default BillFormFields
