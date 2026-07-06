import { FaUserAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

import logo from "../../assets/logo.png"
function Navbar() {
    return (
        <nav className="flex items-center justify-between bg-gray-900 p-3">
            <div className="flex items-center gap-3">
                <img
                    src={logo}
                    className="h-12 w-auto"
                    alt="Expense Tracker Logo"
                />

                <p className="text-green-400">
                    Expense Tracker
                </p>
            </div>

            <ul className="flex items-center gap-4">
                <li>
                    <FaUserAlt className="text-green-400 text-2xl" />
                </li>

                <li>
                    <IoIosNotifications className="text-green-400 text-2xl" />
                </li>
            </ul>
        </nav>
    );
}
export default Navbar