import { Route, Routes } from "react-router-dom"
import Navbar from "../Components/Navigation/Navbar"
import SideNavbar from "../Components/Navigation/SideNavbar"
import Accounts from "../Pages/Accounts"
import Loans from "../Pages/Loans"
import People from "../Pages/People"
import IncomeSources from "../Pages/IncomeSources"
import CreditHistory from "../Pages/CreditHistory"
import Bills from "../Pages/Bills"
import Schedules from "../Pages/Schedules"
import Transactions from "../Pages/Transactions"

function MainActivity() {
    return (
        <div className="grid sm:grid-cols-12 ">
            <div className="sm:col-span-12"> <Navbar /></div>
            <div className="sm:col-span-2 h-screen bg-gray-950 p-2"> <SideNavbar /></div>
            <div className="sm:col-span-10 h-screen bg-gray-800 p-2 overflow-auto">
                <Routes>
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/loans" element={<Loans />} />
                    <Route path="/people" element={<People />} />
                    <Route path="/income" element={<IncomeSources />} />
                    <Route path="/debts" element={<CreditHistory />} />
                    <Route path="/bills" element={<Bills />} />
                    <Route path="/schedules" element={<Schedules />} />
                    <Route path="/transactions" element={<Transactions />} />
                </Routes>
            </div>
        </div>
    )
}

export default MainActivity