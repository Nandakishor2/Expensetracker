import { useState } from "react"
import AddAccount from "../Components/Accounts/AddAccount"
import { type AccountDetails } from "../Components/Accounts/Types"
import ListAccounts from "../Components/Accounts/ListAccounts"
import UpdateAccount from "../Components/Accounts/UpdateAccount"

function Accounts() {

    const [accountDetailsList, setAccountDetailsList] = useState<AccountDetails[]>([{
        accountID: "1660101000874955",
        ifscCode: "UBIN0802359",
        accountType: "current",
        bankName: "Union Bank of India",
        closingBalance: 4999999,
        createdDate: "2026-07-07",
        updatedDate: "2026-07-07",
    }])

    const [selectedAccount, setSelectedAccount] = useState<AccountDetails | null>(null)

    return (
        <>
            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">Accounts</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete your accounts from here.</p>

            </div>
            {
                selectedAccount != null ? (
                    <UpdateAccount existingAccountDetails={selectedAccount} />
                ) :
                    (<AddAccount />)
            }

            <hr className="mt-2 mb-2" />
            <ListAccounts accountDetails={accountDetailsList} onEditAccount={(accountDetails) => {
                console.log("Edit Account Details", accountDetails)
                setSelectedAccount(accountDetails)
            }} />

        </>

    )
}

export default Accounts