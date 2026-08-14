import Button from "../UI/Button"
import { useState } from "react"
import type { CreatePerson } from "./Types"
import PersonFormFields from "./PersonFormFields"
import { createPerson } from "../../API/peopleAPI"

type AddPersonProps = {
    refreshTableFunction: () => Promise<any>
}

function AddPerson({ refreshTableFunction }: AddPersonProps) {
    const defaultPersonDetails: CreatePerson = {
        name: "",
        contactNumber: "",
        whatsappNumber: "",
        email: ""
    }

    const [personDetails, setPersonDetails] = useState<CreatePerson>(defaultPersonDetails)

    const handleCreatePerson = async () => {
        try {
            await createPerson(personDetails)
            setPersonDetails(defaultPersonDetails)
            refreshTableFunction()
        } catch (error) {
            console.error("Failed to create person", error)
        }
    }

    return (
        <div className="grid sm:grid-cols-12 mt-5 gap-2">
            <PersonFormFields 
                personDetails={personDetails}
                onChange={(e) => {
                    const { name, value } = e.target
                    setPersonDetails((prev) => ({ ...prev, [name]: value }))
                }} 
            />

            <div className="sm:col-span-9"></div>
            <div className="sm:col-span-3 flex gap-2 justify-end-safe">
                <Button type="button" variant="ghost" onClick={() => {
                    setPersonDetails(defaultPersonDetails)
                }} className="text-sm">Clear</Button>
                <Button type="button" variant="primary" onClick={handleCreatePerson} className="text-sm">Add</Button>
            </div>
        </div>
    )
}

export default AddPerson
