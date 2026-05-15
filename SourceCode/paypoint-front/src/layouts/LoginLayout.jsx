import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import Navbar from "../Components/Auth/Navbar";
import { useEffect, useState } from "react";

const LoginLayout = () => {
    const [isSuccessAlertHidden, setIsSuccessAlertHidden] = useState(true);
    const [serachParams] = useSearchParams();

    useEffect(() => {
        const query = serachParams.get('logout');
        let timeout;
        
        if (query != null){
            timeout = setTimeout(() => {
                setIsSuccessAlertHidden(false);
            }, 0)
        }


        return () => {
            clearTimeout(timeout);
        }       
    }, [serachParams])

    const userLogin = localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN);
    console.log(userLogin)
    if(userLogin != null){
        return <Navigate to={"/Dashboard"} replace/>
    }

    return (
        <>
            <Navbar/>
            <Outlet context={isSuccessAlertHidden}/>
        </>
    )
}


export default LoginLayout;