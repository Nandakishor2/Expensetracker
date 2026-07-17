import NavItem from "./NavItem"
import { BsBank } from "react-icons/bs";
import { LuIndianRupee } from "react-icons/lu";
import { TbTransactionRupee } from "react-icons/tb";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
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
            <li><NavItem Icon={TbTransactionRupee} name="Transactions" onClick={() => { }} />  </li>
        </ul>
    )
}

export default SideNavbar