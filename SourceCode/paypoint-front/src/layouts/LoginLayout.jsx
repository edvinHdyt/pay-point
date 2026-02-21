import { Outlet } from "react-router-dom";
import Navbar from "../Components/Auth/Navbar";

const LoginLayout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}


export default LoginLayout;