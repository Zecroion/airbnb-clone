import { Outlet } from "react-router-dom";
import Header from "../components/header/header.component";

const MainHeaderLayout = () => {
    return (
        <div>
            <Header/>
            <Outlet></Outlet>
        </div>
    )
}
export default MainHeaderLayout;