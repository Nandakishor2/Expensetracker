import Navbar from "../Components/Navigation/Navbar"
import SideNavbar from "../Components/Navigation/SideNavbar"
import Accounts from "../Pages/Accounts"
function MainActivity() {
    return (
        <div className="grid sm:grid-cols-12 ">
            <div className="sm:col-span-12"> <Navbar /></div>
            <div className="sm:col-span-2 h-screen bg-gray-950 p-2"> <SideNavbar /></div>
            <div className="sm:col-span-9 h-screen bg-gray-800 p-2"> <Accounts /></div>
            <div className="sm:col-span-1 h-screen bg-gray-950"> Adverts </div>
        </div>
    )
}

export default MainActivity