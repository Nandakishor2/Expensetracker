import Text from "../UI/Text"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import type { loanDetails } from "./Types";

type loanListType = {
    loanDetailsList: loanDetails[]
}

function ListLoans({ loanDetailsList }: loanListType) {
    return (
        <>
            <table className="w-full border-b border-white/10 pb-3">

                <thead className="px-4 py-3 whitespace-nowrap text-left">
                    <tr>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Loan ID</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Account ID</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Company Name</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Purpose</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Loan Amount</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Start Date</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">End Date</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">EMI Date</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Rate of Intrest</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">EMI Amount</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Active Status</Text></th>
                        <th className="px-4 py-3 whitespace-nowrap text-left"><Text color="primary" size="label">Actions</Text></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loanDetailsList.length > 0 ? (

                            loanDetailsList.map((row) => (
                                <tr key={row.loanID} >
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.loanID}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.accountID}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.companyName}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.purpose}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.loanAmount}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{new Date(row.startDate).toISOString().split("T")[0]}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{new Date(row.endDate).toISOString().split("T")[0]}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.emiDate}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.rateOfIntrest}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.emiAmount}</Text>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-left">
                                        <Text color="primary" size="label">{row.activeStatus}</Text>
                                    </td>
                                    <td className="flex gap-4 pt-4 pb-4 ">
                                        <button
                                            type="button"
                                            className="text-green-500 hover:text-green-400"
                                        >
                                            <FaEdit className="text-xl" />
                                        </button>

                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-400"

                                        >
                                            <MdDeleteForever className="text-xl" />
                                        </button>
                                    </td>

                                </tr>
                            ))

                        ) : (
                            <tr className="text-center">
                                <td colSpan={7} className="pt-16 pb-16 text-center">
                                    <Text color="danger" size="heading">
                                        <h1> There are no loans to display</h1>
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
export default ListLoans