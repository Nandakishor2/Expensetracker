import type { ChangeEvent } from "react"
import type { PersonDetails } from "./Types"
import TextGroup from "../Forms/TextGroup"

type PersonFormFieldsProps = {
    personDetails: Partial<PersonDetails>
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function PersonFormFields({ personDetails, onChange }: PersonFormFieldsProps) {
    return (
        <>
            <div className="sm:col-span-4">
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
                    onChange={onChange} 
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
