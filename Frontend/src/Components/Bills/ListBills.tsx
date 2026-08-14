import Text from "../UI/Text"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import type { BillDetails } from "./Types";

type billListType = {
    billList: BillDetails[]
    onEditBill: (selected: BillDetails) => void
    onDeleteBill: (billID: string) => void
}

function ListBills({ billList, onEditBill, onDeleteBill }: billListType) {
    return (
        <>
            <table className="w-full border-b border-white/10 pb-3">
                <thead className="text-left">
                    <tr>
                        <th className="text-left"><Text color="primary" size="body">Organization</Text></th>
                        <th className="text-left"><Text color="primary" size="body">Description</Text></th>
                        <th className="text-left"><Text color="primary" size="body">Due Date</Text></th>
                        <th className="text-left"><Text color="primary" size="body">Actions</Text></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        billList.length > 0 ? (
                            billList.map((row) => (
                                <tr key={row.billID}>
                                    <td className="pt-4 pb-4">
                                        <Text color="primary" size="label">{row.organization}</Text>
                                    </td>
                                    <td className="pt-4 pb-4">
                                        <Text color="primary" size="label">{row.description}</Text>
                                    </td>
                                    <td className="pt-4 pb-4">
                                        <Text color="primary" size="label">{row.dueDate ? new Date(row.dueDate).toISOString().split("T")[0] : ""}</Text>
                                    </td>
                                    <td className="flex gap-4 pt-4 pb-4">
                                        <button
                                            type="button"
                                            onClick={() => onEditBill(row)}
                                            aria-label={`Edit bill`}
                                            className="text-green-500 hover:text-green-400 cursor-pointer"
                                        >
                                            <FaEdit className="text-xl" />
                                        </button>

                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-400 cursor-pointer"
                                            onClick={() => onDeleteBill(row.billID)}
                                        >
                                            <MdDeleteForever className="text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan={4} className="pt-16 pb-16 text-center">
                                    <Text color="danger" size="heading">
                                        <h1>There are no bills to display</h1>
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

export default ListBills
