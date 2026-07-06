import { useState } from "react"
import AddAccount from "../Components/Accounts/AddAccount"
import { type AccountDetails } from "../Components/Accounts/Types"
import ListAccounts from "../Components/Accounts/ListAccounts"

function Accounts() {

    const [accountDetailsList, setAccountDetailsList] = useState<AccountDetails[]>([])

    return (
        <>
            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">Accounts</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete your accounts from here.</p>

            </div>
            <AddAccount />
            <hr className="mt-2 mb-2" />
            <ListAccounts accountDetails={accountDetailsList} />

        </>

    )
}

export default Accounts