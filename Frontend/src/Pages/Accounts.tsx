import { useEffect, useState, useCallback } from "react"
import AddAccount from "../Components/Accounts/AddAccount"
import { type AccountDetails } from "../Components/Accounts/Types"
import ListAccounts from "../Components/Accounts/ListAccounts"
import UpdateAccount from "../Components/Accounts/UpdateAccount"
import { deleteAccountDetails, getAccountDetails } from "../API/accountAPI"
import { useAPIResponse } from "../Context/APIResponse"
import TextGroup from "../Components/Forms/TextGroup"
import SelectGroup from "../Components/Forms/SelectGroup"
import Button from "../Components/UI/Button"

function Accounts() {

    const [accountDetailsList, setAccountDetailsList] = useState<AccountDetails[]>([])

    const [selectedAccount, setSelectedAccount] = useState<AccountDetails | null>(null)
    const { showSuccess, showFailure } = useAPIResponse()

    const [filters, setFilters] = useState({
        accountType: "" as string,
        bankName: "" as string,
        minClosingBalance: "" as string | number,
        maxClosingBalance: "" as string | number
    })

    const refreshAccountsTable = useCallback(async (currentFilters?: typeof filters) => {
        try {
            const activeFilters: any = {}
            const f = currentFilters || filters
            if (f.accountType && f.accountType !== "all") activeFilters.accountType = f.accountType
            if (f.bankName.trim()) activeFilters.bankName = f.bankName.trim()
            if (f.minClosingBalance !== "") activeFilters.minClosingBalance = Number(f.minClosingBalance)
            if (f.maxClosingBalance !== "") activeFilters.maxClosingBalance = Number(f.maxClosingBalance)

            const responseData = await getAccountDetails(activeFilters)
            setAccountDetailsList(responseData.accountDetailsList || [])
            setSelectedAccount(null)
        }
        catch (error: any) {
            showFailure(error.message || "Account Details could not be fetched")
            setAccountDetailsList([])
        }
    }, [showFailure, filters])

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

            <div className="bg-white/5 p-4 rounded-lg my-4 border border-white/10">
                <h3 className="text-sm font-semibold text-white mb-3">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <TextGroup 
                        id="filterBankName"
                        name="bankName"
                        labelName="BANK NAME"
                        value={filters.bankName}
                        placeholder="Filter by bank name"
                        onChange={(e) => setFilters(prev => ({ ...prev, bankName: e.target.value }))}
                    />
                    <SelectGroup 
                        id="filterAccountType"
                        name="accountType"
                        labelName="ACCOUNT TYPE"
                        value={filters.accountType || "all"}
                        dropdownItems={{ "all": "All", "savings": "Savings", "current": "Current" }}
                        onChange={(e) => setFilters(prev => ({ ...prev, accountType: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterMinClosingBalance"
                        name="minClosingBalance"
                        labelName="MIN BALANCE"
                        type="number"
                        value={String(filters.minClosingBalance)}
                        placeholder="Min closing balance"
                        onChange={(e) => setFilters(prev => ({ ...prev, minClosingBalance: e.target.value }))}
                    />
                    <TextGroup 
                        id="filterMaxClosingBalance"
                        name="maxClosingBalance"
                        labelName="MAX BALANCE"
                        type="number"
                        value={String(filters.maxClosingBalance)}
                        placeholder="Max closing balance"
                        onChange={(e) => setFilters(prev => ({ ...prev, maxClosingBalance: e.target.value }))}
                    />
                </div>
                <div className="flex gap-2 justify-end mt-3">
                    <Button variant="ghost" className="text-sm" onClick={() => {
                        const cleared = { accountType: "", bankName: "", minClosingBalance: "", maxClosingBalance: "" }
                        setFilters(cleared)
                        refreshAccountsTable(cleared)
                    }}>Reset</Button>
                    <Button variant="secondary" className="text-sm" onClick={() => refreshAccountsTable(filters)}>Search</Button>
                </div>
            </div>

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