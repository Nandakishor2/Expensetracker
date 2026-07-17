import { FaUserAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav className="flex items-center justify-between bg-gray-900 p-3">
            <div className="flex items-center gap-3">
                <Link to="/"> <img
                    src={logo}
                    className="h-12 w-auto"
                    alt="Expense Tracker Logo"
                />
                </Link>

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