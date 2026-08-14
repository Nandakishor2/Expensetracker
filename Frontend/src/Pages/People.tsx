import { useEffect, useState } from "react"
import AddPerson from "../Components/People/AddPerson"
import { type PersonDetails } from "../Components/People/Types"
import ListPeople from "../Components/People/ListPeople"
import UpdatePerson from "../Components/People/UpdatePerson"
import { deletePerson, getPeople } from "../API/peopleAPI"

function People() {
    const [peopleList, setPeopleList] = useState<PersonDetails[]>([])
    const [selectedPerson, setSelectedPerson] = useState<PersonDetails | null>(null)

    async function refreshPeopleTable() {
        try {
            const responseData = await getPeople()
            console.log(responseData.message)
            setPeopleList(responseData.peopleList || [])
            setSelectedPerson(null)
        } catch {
            console.log("People Details could not be fetched")
            setPeopleList([])
        }
    }

    async function handleDeletePerson(personID: string) {
        try {
            const responseData = await deletePerson(personID)
            console.log(responseData.message)
            refreshPeopleTable()
        } catch {
            console.log("Person could not be deleted")
        }
    }

    useEffect(() => {
        refreshPeopleTable()
    }, [])

    return (
        <>
            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">People</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete people from here.</p>
            </div>
            {
                selectedPerson != null ? (
                    <UpdatePerson existingPersonDetails={selectedPerson} refreshTableFunction={refreshPeopleTable} />
                ) : (
                    <AddPerson refreshTableFunction={refreshPeopleTable} />
                )
            }

            <hr className="mt-2 mb-2" />
            <ListPeople 
                peopleDetails={peopleList} 
                onEditPerson={(person) => {
                    console.log("Edit Person Details", person)
                    setSelectedPerson(person)
                }}
                onDeletePerson={handleDeletePerson} 
            />
        </>
    )
}

export default People
