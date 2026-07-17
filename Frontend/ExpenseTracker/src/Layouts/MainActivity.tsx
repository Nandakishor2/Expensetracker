import { Route, Routes } from "react-router-dom"
import Navbar from "../Components/Navigation/Navbar"
import SideNavbar from "../Components/Navigation/SideNavbar"
import Accounts from "../Pages/Accounts"
import Loans from "../Pages/Loans"
function MainActivity() {
    return (
        <div className="grid sm:grid-cols-12 ">
            <div className="sm:col-span-12"> <Navbar /></div>
            <div className="sm:col-span-2 h-screen bg-gray-950 p-2"> <SideNavbar /></div>
            <div className="sm:col-span-10 h-screen bg-gray-800 p-2">
                <Routes>
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/loans" element={<Loans />} />
                </Routes>


            </div>
        </div>
    )
}

export default MainActivity