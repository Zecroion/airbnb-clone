import { Outlet } from "react-router-dom";

const { default: AccountNav } = require("../../components/account-nav/account-nav.component")


const Account = () => {
    return (
        <div>
            <AccountNav />
            <Outlet/>
        </div>
    )
}

export default Account;