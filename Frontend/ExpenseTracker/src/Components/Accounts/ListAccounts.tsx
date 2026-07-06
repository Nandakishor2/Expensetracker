import Text from "../UI/Text"
import { type AccountDetails } from "./Types"

type accountListType = {
    accountDetails: AccountDetails[]
}

function ListAccounts({ accountDetails }: accountListType) {
    return (
        <>
            <table className="w-full border-b border-white/10 pb-3">

                <thead className="text-left">
                    <th className="text-left"><Text color="primary" size="label">Bank Name</Text></th>
                    <th className="text-left"><Text color="primary" size="label">Account Type</Text></th>
                    <th className="text-left"><Text color="primary" size="label">IFSC Code</Text></th>
                    <th className="text-left"><Text color="primary" size="label">Closing Balance</Text></th>
                    <th className="text-left"><Text color="primary" size="label">Created Date</Text></th>
                    <th className="text-left"><Text color="primary" size="label">Updated Date</Text></th>
                    <th className="text-left"><Text color="primary" size="label">Actions</Text></th>
                </thead>
                <tbody>
                    {
                        accountDetails.length > 0 ? (

                            accountDetails.map((row) => (
                                <tr>
                                    <td>
                                        <Text color="primary" size="body">{row.bankName}</Text>
                                    </td>
                                    <td>
                                        <Text color="primary" size="body">{row.accountType}</Text>
                                    </td>
                                    <td>
                                        <Text color="primary" size="body">{row.ifscCode}</Text>
                                    </td>
                                    <td>
                                        <Text color="primary" size="body">{row.closingbalance}</Text>
                                    </td>
                                    <td>
                                        <Text color="primary" size="body">{row.createdDate}</Text>
                                    </td>
                                    <td>
                                        <Text color="primary" size="body">{row.updatedDate}</Text>
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