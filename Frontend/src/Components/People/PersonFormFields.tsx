import { useState, type ChangeEvent } from "react"
import type { PersonDetails } from "./Types"
import TextGroup from "../Forms/TextGroup"

type PersonFormFieldsProps = {
    personDetails: Partial<PersonDetails>
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function PersonFormFields({
    personDetails,
    onChange
}: PersonFormFieldsProps) {

    const [chkCopyMobileNumber, setChkCopyMobileNumber] = useState(true)

    const handleContactNumberChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        onChange(event)

        if (chkCopyMobileNumber) {
            onChange({
                ...event,
                target: {
                    ...event.target,
                    name: "whatsappNumber",
                    value: event.target.value
                }
            })
        }
    }

    const handleCopyMobileNumber = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const checked = event.target.checked

        setChkCopyMobileNumber(checked)

        if (checked) {
            onChange({
                ...event,
                target: {
                    ...event.target,
                    name: "whatsappNumber",
                    value: personDetails.contactNumber || ""
                }
            })
        }
    }

    return (
        <>
            <div className="sm:col-span-3">
                <TextGroup
                    id="txtName"
                    name="name"
                    labelName="NAME"
                    value={personDetails.name || ""}
                    placeholder="Please provide the person's name"
                    onChange={onChange}
                />
            </div>

            <div className="sm:col-span-4">
                <TextGroup
                    id="txtContact"
                    name="contactNumber"
                    labelName="CONTACT NUMBER"
                    value={personDetails.contactNumber || ""}
                    placeholder="Please provide contact number"
                    onChange={handleContactNumberChange}
                />
            </div>

            <div className="sm:col-span-1 flex items-center justify-center">
                <input
                    title="Copy mobile number to whatsapp number"
                    type="checkbox"
                    name="sameAsContactNumber"
                    checked={chkCopyMobileNumber}
                    onChange={handleCopyMobileNumber}
                    className="w-5 h-5 rounded cursor-pointer"
                />
            </div>

            <div className="sm:col-span-4">
                <TextGroup
                    id="txtWhatsapp"
                    name="whatsappNumber"
                    labelName="WHATSAPP NUMBER"
                    value={personDetails.whatsappNumber || ""}
                    placeholder="Please provide WhatsApp number"
                    onChange={onChange}
                />
            </div>

            <div className="sm:col-span-4">
                <TextGroup
                    id="txtEmail"
                    name="email"
                    labelName="EMAIL ADDRESS"
                    value={personDetails.email || ""}
                    placeholder="Please provide email address (optional)"
                    type="email"
                    onChange={onChange}
                />
            </div>

            <div className="sm:col-span-8"></div>
        </>
    )
}

export default PersonFormFields