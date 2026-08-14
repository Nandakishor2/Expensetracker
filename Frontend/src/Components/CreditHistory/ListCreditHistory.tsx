import Text from "../UI/Text"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import type { CreditHistoryDetails } from "./Types";

type creditHistoryListType = {
    creditHistoryList: CreditHistoryDetails[]
    lenderMap: Record<string, string>
    onEditCreditHistory: (selected: CreditHistoryDetails) => void
    onDeleteCreditHistory: (creditHistoryID: string) => void
}

function ListCreditHistory({ creditHistoryList, lenderMap, onEditCreditHistory, onDeleteCreditHistory }: creditHistoryListType) {
    return (
        <>
            <table className="w-full border-b border-white/10 pb-3">
                <thead className="px-4 py-3 whitespace-nowrap text-left">
                    <tr>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Lender</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Purpose</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Payment Mode</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Received Date</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Due Date</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Status</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Cleared Date</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Repayment Mode</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Actions</Text></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        creditHistoryList.length > 0 ? (
                            creditHistoryList.map((row) => (
                                <tr key={row.creditHistoryID}>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{lenderMap[row.peopleID] || row.peopleID}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.purpose}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.creditPaymentMode}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.recievedDate ? new Date(row.recievedDate).toISOString().split("T")[0] : ""}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.dueDate ? new Date(row.dueDate).toISOString().split("T")[0] : ""}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color={row.dueCleared ? "primary" : "danger"} size="label">
                                            {row.dueCleared ? "Cleared" : "Pending"}
                                        </Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.dueClearedDate ? new Date(row.dueClearedDate).toISOString().split("T")[0] : "-"}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.repaymentMode || "-"}</Text>
                                    </td>
                                    <td className="flex gap-4 pt-4 pb-4">
                                        <button
                                            type="button"
                                            onClick={() => onEditCreditHistory(row)}
                                            aria-label={`Edit credit history`}
                                            className="text-green-500 hover:text-green-400 cursor-pointer"
                                        >
                                            <FaEdit className="text-xl" />
                                        </button>

                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-400 cursor-pointer"
                                            onClick={() => onDeleteCreditHistory(row.creditHistoryID)}
                                        >
                                            <MdDeleteForever className="text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan={9} className="pt-16 pb-16 text-center">
                                    <Text color="danger" size="heading">
                                        <h1>There are no credit history records to display</h1>
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

export default ListCreditHistory
