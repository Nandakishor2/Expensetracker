import NavItem from "./NavItem"
import { BsBank } from "react-icons/bs";
import { LuIndianRupee } from "react-icons/lu";
import { TbTransactionRupee } from "react-icons/tb";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaFileInvoiceDollar, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
function SideNavbar() {
    return (
        <ul>
            <li>
                <Link to="/accounts">
                    <NavItem Icon={BsBank} name="Accounts" onClick={() => { }} />
                </Link>
            </li>
            <li>
                <Link to="/income">
                    <NavItem Icon={LuIndianRupee} name="Income" onClick={() => { }} />
                </Link>
            </li>
            <li>
                <Link to="/loans">
                    <NavItem Icon={FaHandHoldingDollar} name="Loans" onClick={() => { }} />
                </Link>
            </li>
            <li>
                <Link to="/debts">
                    <NavItem Icon={GiPayMoney} name="Debts" onClick={() => { }} />
                </Link>
            </li>
            <li>
                <Link to="/people">
                    <NavItem Icon={FaPeopleGroup} name="People" onClick={() => { }} />
                </Link>
            </li>
            <li>
                <Link to="/transactions">
                    <NavItem Icon={TbTransactionRupee} name="Transactions" onClick={() => { }} />
                </Link>
            </li>
            <li>
                <Link to="/bills">
                    <NavItem Icon={FaFileInvoiceDollar} name="Bills" onClick={() => { }} />
                </Link>
            </li>
            <li>
                <Link to="/schedules">
                    <NavItem Icon={FaCalendarAlt} name="Schedules" onClick={() => { }} />
                </Link>
            </li>
        </ul>
    )
}

export default SideNavbar