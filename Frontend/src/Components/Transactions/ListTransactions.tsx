import Text from "../UI/Text"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import type { TransactionDetails } from "./Types";

type transactionListType = {
    transactionList: TransactionDetails[]
    onEditTransaction: (selected: TransactionDetails) => void
    onDeleteTransaction: (transactionID: string) => void
}

function ListTransactions({ transactionList, onEditTransaction, onDeleteTransaction }: transactionListType) {
    return (
        <>
            <table className="w-full border-b border-white/10 pb-3">
                <thead className="px-4 py-3 whitespace-nowrap text-left">
                    <tr>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Category</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Description</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Date</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Type</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Amount</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Ref Schedule</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Ref Loan</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Ref Bill</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Ref Income</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Actions</Text></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactionList.length > 0 ? (
                            transactionList.map((row) => (
                                <tr key={row.transactionID}>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.category.toUpperCase()}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.description}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.transactionDate ? new Date(row.transactionDate).toISOString().split("T")[0] : ""}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color={row.transactionType === "credit" ? "primary" : "danger"} size="label">
                                            {row.transactionType === "credit" ? "Credit" : "Debit"}
                                        </Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.amount}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.scheduleID || "-"}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.loanID || "-"}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.billID || "-"}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.incomeID || "-"}</Text>
                                    </td>
                                    <td className="flex gap-4 pt-4 pb-4">
                                        <button
                                            type="button"
                                            onClick={() => onEditTransaction(row)}
                                            aria-label={`Edit transaction`}
                                            className="text-green-500 hover:text-green-400 cursor-pointer"
                                        >
                                            <FaEdit className="text-xl" />
                                        </button>

                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-400 cursor-pointer"
                                            onClick={() => onDeleteTransaction(row.transactionID)}
                                        >
                                            <MdDeleteForever className="text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center">
                                <td colSpan={10} className="pt-16 pb-16 text-center">
                                    <Text color="danger" size="heading">
                                        <h1>There are no transactions to display</h1>
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

export default ListTransactions
