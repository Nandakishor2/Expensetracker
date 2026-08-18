import { useEffect, useState, useCallback } from "react"
import AddAccount from "../Components/Accounts/AddAccount"
import { type AccountDetails } from "../Components/Accounts/Types"
import ListAccounts from "../Components/Accounts/ListAccounts"
import UpdateAccount from "../Components/Accounts/UpdateAccount"
import { deleteAccountDetails, getAccountDetails } from "../API/accountAPI"
import { useAPIResponse } from "../Context/APIResponse"

function Accounts() {

    const [accountDetailsList, setAccountDetailsList] = useState<AccountDetails[]>([])

    const [selectedAccount, setSelectedAccount] = useState<AccountDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const refreshAccountsTable = useCallback(async () => {
        try {
            const responseData = await getAccountDetails()
            setAccountDetailsList(responseData.accountDetailsList || [])
            setSelectedAccount(null)
        }
        catch (error: any) {
            showFailure(error.message || "Account Details could not be fetched")
            setAccountDetailsList([])
        }
    }, [showFailure])

    const deleteAccount = useCallback(async (accountID: string) => {
        try {
            const responseData = await deleteAccountDetails(accountID)
            showSuccess(responseData.message || "Account deleted successfully", 3000)
            refreshAccountsTable()
        }
        catch (error: any) {
            showFailure(error.message || "Account could not be deleted")
        }
    }, [refreshAccountsTable, showSuccess, showFailure])

    useEffect(() => {
        refreshAccountsTable()

    }, [refreshAccountsTable])

    return (
        <>

            <div className="border-b border-white/10 pb-3 ">
                <h2 className="text-base/7 font-semibold text-white">Accounts</h2>
                <p className="mt-1 text-sm/6 text-gray-400">Find, Create , Update or Delete your accounts from here.</p>

            </div>
            {
                selectedAccount != null ? (
                    <UpdateAccount existingAccountDetails={selectedAccount} refreshTableFunction={refreshAccountsTable} />
                ) :
                    (<AddAccount refreshTableFunction={refreshAccountsTable} />)
            }

            <hr className="mt-2 mb-2" />
            <ListAccounts accountDetails={accountDetailsList} onEditAccount={(accountDetails) => {
                console.log("Edit Account Details", accountDetails)
                setSelectedAccount(accountDetails)
            }}

                onDeleteAccount={deleteAccount} />

        </>

    )
}

export default Accounts