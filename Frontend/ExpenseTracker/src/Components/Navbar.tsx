import { FaUserAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import logo from "../assets/logo.png"
function Navbar() {
    return (
        <nav className="flex justify-between bg-gray-900 p-3 align-middle">

            <div className="flex align-middle justify-between">
                <img src={logo} className="h-12" alt="Logo" />
                <p className="text-green-400">Expense Tracker</p>
            </div>
            <ul className="flex">
                <li><FaUserAlt /></li>
                <li><IoIosNotifications /></li>
            </ul>
        </nav>
    )
}

export default Navbar