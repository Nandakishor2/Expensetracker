import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainActivity from '../Layouts/MainActivity'
import Accounts from '../Pages/Accounts'
import Loans from '../Pages/Loans'
import People from '../Pages/People'
import IncomeSources from '../Pages/IncomeSources'
import CreditHistory from '../Pages/CreditHistory'
import Bills from '../Pages/Bills'
import Schedules from '../Pages/Schedules'
import Transactions from '../Pages/Transactions'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainActivity />}>
                    <Route element={<Accounts />} path='/accounts' />
                    <Route element={<Loans />} path='/loans' />
                    <Route element={<People />} path='/people' />
                    <Route element={<IncomeSources />} path='/income' />
                    <Route element={<CreditHistory />} path='/debts' />
                    <Route element={<Bills />} path='/bills' />
                    <Route element={<Schedules />} path='/schedules' />
                    <Route element={<Transactions />} path='/transactions' />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes