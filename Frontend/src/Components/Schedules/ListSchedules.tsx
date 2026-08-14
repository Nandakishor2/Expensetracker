import Text from "../UI/Text"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import type { ScheduleDetails } from "./Types";

type scheduleListType = {
    scheduleList: ScheduleDetails[]
    onEditSchedule: (selected: ScheduleDetails) => void
    onDeleteSchedule: (scheduleID: string) => void
}

function ListSchedules({ scheduleList, onEditSchedule, onDeleteSchedule }: scheduleListType) {
    return (
        <>
            <table className="w-full border-b border-white/10 pb-3">
                <thead className="px-4 py-3 whitespace-nowrap text-left">
                    <tr>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Name</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Description</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Due Date</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Loan ID</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Bill ID</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Income ID</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Type</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Amount</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Status</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Actions</Text></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        scheduleList.length > 0 ? (
                            scheduleList.map((row) => (
                                <tr key={row.scheduleID}>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.name}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.description}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.dueDate ? new Date(row.dueDate).toISOString().split("T")[0] : ""}</Text>
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
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color={row.transactionType === "credit" ? "primary" : "danger"} size="label">
                                            {row.transactionType === "credit" ? "Credit" : "Debit"}
                                        </Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.amount}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color={row.sessionStatus === "completed" ? "primary" : row.sessionStatus === "cancelled" ? "danger" : "muted"} size="label">
                                            {row.sessionStatus.toUpperCase()}
                                        </Text>
                                    </td>
                                    <td className="flex gap-4 pt-4 pb-4">
                                        <button
                                            type="button"
                                            onClick={() => onEditSchedule(row)}
                                            aria-label={`Edit schedule`}
                                            className="text-green-500 hover:text-green-400 cursor-pointer"
                                        >
                                            <FaEdit className="text-xl" />
                                        </button>

                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-400 cursor-pointer"
                                            onClick={() => onDeleteSchedule(row.scheduleID)}
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
                                        <h1>There are no schedules to display</h1>
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

export default ListSchedules
