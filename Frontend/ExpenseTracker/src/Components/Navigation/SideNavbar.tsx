import NavItem from "./NavItem"
import { BsBank } from "react-icons/bs";
import { LuIndianRupee } from "react-icons/lu";
import { TbTransactionRupee } from "react-icons/tb";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
function SideNavbar() {
    return (
        <ul>
            <li><NavItem Icon={BsBank} name="Accounts" onClick={() => { }} />  </li>
            <li><NavItem Icon={LuIndianRupee} name="Income" onClick={() => { }} />  </li>
            <li><NavItem Icon={FaHandHoldingDollar} name="Loans" onClick={() => { }} />  </li>
            <li><NavItem Icon={GiPayMoney} name="Debts" onClick={() => { }} />  </li>
            <li><NavItem Icon={FaPeopleGroup} name="People" onClick={() => { }} />  </li>
            <li><NavItem Icon={TbTransactionRupee} name="Transactions" onClick={() => { }} />  </li>
        </ul>
    )
}

export default SideNavbar