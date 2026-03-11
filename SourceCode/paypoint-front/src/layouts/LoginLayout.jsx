import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../Components/Auth/Navbar";

const LoginLayout = () => {

    const userLogin = localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN);

    if(userLogin != null){
        return <Navigate to={"/Dashboard"} replace/>
    }


    return (
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}


export default LoginLayout;