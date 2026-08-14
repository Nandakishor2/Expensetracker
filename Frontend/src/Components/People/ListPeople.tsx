import Text from "../UI/Text"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import type { PersonDetails } from "./Types";

type peopleListType = {
    peopleDetails: PersonDetails[]
    onEditPerson: (selectedPerson: PersonDetails) => void
    onDeletePerson: (personID: string) => void
}

function ListPeople({ peopleDetails, onEditPerson, onDeletePerson }: peopleListType) {
    return (
        <>
            <table className="w-full border-b border-white/10 pb-3">
                <thead className="text-left">
                    <tr>
                        <th className="text-left"><Text color="primary" size="body">Name</Text></th>
                        <th className="text-left"><Text color="primary" size="body">Contact Number</Text></th>
                        <th className="text-left"><Text color="primary" size="body">WhatsApp Number</Text></th>
                        <th className="text-left"><Text color="primary" size="body">Email</Text></th>
                        <th className="text-left"><Text color="primary" size="body">Actions</Text></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        peopleDetails.length > 0 ? (
                            peopleDetails.map((row) => (
                                <tr key={row.personID}>
                                    <td className="pt-4 pb-4">
                                        <Text color="primary" size="label">{row.name}</Text>
                                    </td>
                                    <td className="pt-4 pb-4">
                                        <Text color="primary" size="label">{row.contactNumber}</Text>
                                    </td>
                                    <td className="pt-4 pb-4">
                                        <Text color="primary" size="label">{row.whatsappNumber}</Text>
                                    </td>
                                    <td className="pt-4 pb-4">
                                        <Text color="primary" size="label">{row.email || "-"}</Text>
                                    </td>
                                    <td className="flex gap-4 pt-4 pb-4">
                                        <button
                                            type="button"
                                            onClick={() => onEditPerson(row)}
                                            aria-label={`Edit ${row.name}`}
                                            className="text-green-500 hover:text-green-400 cursor-pointer"
                                        >
                                            <FaEdit className="text-xl" />
                                        </button>

                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-400 cursor-pointer"
                                            onClick={() => {
                                                onDeletePerson(row.personID)
                                            }}
                                        >
                                            <MdDeleteForever className="text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan={5} className="pt-16 pb-16 text-center">
                                    <Text color="danger" size="heading">
                                        <h1>There are no people to display</h1>
                                    </Text>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default ListPeople
