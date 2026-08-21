import Button from "../UI/Button"
import { useState } from "react"
import type { CreatePerson } from "./Types"
import PersonFormFields from "./PersonFormFields"
import { createPerson } from "../../API/peopleAPI"
import { useAPIResponse } from "../../Context/APIResponse"

type AddPersonProps = {
    refreshTableFunction: () => Promise<any>
}

function AddPerson({ refreshTableFunction }: AddPersonProps) {
    const defaultPersonDetails: CreatePerson = {
        name: "",
        contactNumber: "",
        whatsappNumber: "",
        email: null
    }

    const [personDetails, setPersonDetails] = useState<CreatePerson>(defaultPersonDetails)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { showSuccess, showFailure } = useAPIResponse()

    const handleCreatePerson = async () => {
        setIsSubmitting(true)
        try {
            const res = await createPerson(personDetails)
            showSuccess(res.message || "Person added successfully", 3000)
            setPersonDetails(defaultPersonDetails)
            await refreshTableFunction()
        } catch (error: any) {
            showFailure(error.message || "Failed to create person")
        } finally {
            setIsSubmitting(false)
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
                }} className="text-sm" disabled={isSubmitting}>Clear</Button>
                <Button type="button" variant="primary" onClick={handleCreatePerson} className="text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add"}
                </Button>
            </div>
        </div>
    )
}

export default AddPerson

