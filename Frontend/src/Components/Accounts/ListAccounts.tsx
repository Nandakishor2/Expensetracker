import Text from "../UI/Text"
import { type AccountDetails } from "./Types"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

type accountListType = {
    accountDetails: AccountDetails[]
    onEditAccount: (selectedAccount: AccountDetails) => void
    onDeleteAccount: (accountID: string) => void
}

function ListAccounts({ accountDetails, onEditAccount, onDeleteAccount }: accountListType) {
    return (
        <>
            <table className="w-full border-b border-white/10 pb-3">

                <thead className="text-left">
                    <tr>
                        <th className="text-left"><Text color="primary" size="body">Bank Name</Text></th>
                        <th className="text-left"><Text color="primary" size="body">Account Type</Text></th>
                        <th className="text-left"><Text color="primary" size="body">IFSC Code</Text></th>
                        <th className="text-left"><Text color="primary" size="body">Closing Balance</Text></th>
                        <th className="text-left"><Text color="primary" size="body">Actions</Text></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accountDetails.length > 0 ? (

                            accountDetails.map((row) => (
                                <tr key={row.accountID} >
                                    <td className="pt-4 pb-4">
                                        <Text color="primary" size="label">{row.bankName}</Text>
                                    </td>
                                    <td className="pt-4 pb-4">
                                        <Text color="primary" size="label">{row.accountType}</Text>
                                    </td>
                                    <td className="pt-4 pb-4">
                                        <Text color="primary" size="label">{row.ifscCode}</Text>
                                    </td>
                                    <td className="pt-4 pb-4">
                                        <Text color="primary" size="label">{row.closingBalance}</Text>
                                    </td>
                                    <td className="flex gap-4 pt-4 pb-4 ">
                                        <button
                                            type="button"
                                            onClick={() => onEditAccount(row)}
                                            aria-label={`Edit ${row.bankName}`}
                                            className="text-green-500 hover:text-green-400"
                                        >
                                            <FaEdit className="text-xl" />
                                        </button>

                                        <button
                                            type="button"
                                            className="text-red-500 hover:text-red-400"
                                            onClick={() => {
                                                onDeleteAccount(row.accountID)
                                            }}
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
                                        <h1> There are no accounts to display</h1>
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

export default ListAccounts