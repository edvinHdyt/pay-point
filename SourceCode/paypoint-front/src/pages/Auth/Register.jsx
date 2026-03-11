import { useState } from "react";
import { LoginCard, MainCard } from "../../Components/MainCard";
import { Link } from "react-router-dom";
import {DangerAlert, SuccessAlert, WarningAlert} from "../../Components/Alert";
import axios from "axios";

const Register = () => {
    const [isPassVisible, setIsPassVisibel] = useState(false);
    const [isConfPassVisibale, setIsConfPassVisible] = useState(false);
    const [isUsernameErr, setIsUsernameErr] = useState(false);
    const [isEmailErr, setIsEmailErr] = useState(false);
    const [isPassErr, setIsPassErr] = useState(false);
    const [isPassConfErr, setIsPassConfErr] = useState(false);
    const [isDangerAlertHidden, setIsDangerAlertHidden] = useState(true);
    const [isSuccAlertHidden, setIsSuccAlertHidden] = useState(true);
    const [isWarnAlertHidden, setIsWarnAlertHidden] = useState(true);
    const [alertMsg, setAlertMsg] = useState("");


    const handlePassVisible = () => {
        setIsPassVisibel(true);
    }

    const handlePassInvisible = () => {
        setIsPassVisibel(false);
    }

    const handleConfPassVisible = () => {
        setIsConfPassVisible(true);
    }

    const handleConfPassInvisible = () => {
        setIsConfPassVisible(false);
    }

    const getImageUrl = (name) => {
        return new URL(`../../assets/images/illustration/${name}`, import.meta.url).href;
    }

    const registerAction = async () => {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;
        const confPass = document.getElementById("confPass").value;
        const confPassErrMsg = document.getElementById("confPassMsg");

        if (username == ""){
            setIsUsernameErr(true);
        }else {
            setIsUsernameErr(false);
        }
        if(email == ""){
            setIsEmailErr(true);
        }else {
            setIsEmailErr(false);
        }
        
        if(pass == ""){
            setIsPassErr(true);
        }else {
            setIsPassErr(false);
        }
        
        if(confPass == ""){
            setIsPassConfErr(true);
        }else {
            setIsPassConfErr(false);
        }

        if (pass != confPass){
            confPassErrMsg.innerText = "Password dan Confirm password harus sama!";
            setIsPassConfErr(true);
        } else {
            const apiUrl = import.meta.env.VITE_API_URL;
            try {
                const data = {
                    name: username,
                    email,
                    password: pass
                };
        
                const res = await axios.post(`${apiUrl}auth/register`, data, {headers : {'Content-Type': 'application/json'}});
                const resData = res.data;
                if (resData.status == 200){
                    setAlertMsg(res.data.msg);
                    setIsSuccAlertHidden(false);
                }else {
                    throw new Error(resData.msg);
                }

            } catch (error) {
                setAlertMsg(error.message);
                setIsDangerAlertHidden(false);
            }
        }

    }

    return (
        <div className="flex md:flex-row-reverse flex-col h-[92vh] overflow-hidden w-full">
            <div className="w-[50%]  bg-primary hidden md:flex justify-center items-center">
                <img src={getImageUrl("register-ill.svg")} alt="register-illustration" className="w-10/12 h-80" />
            </div>
            <div className="md:w-[50%] h-screen lg:border-[0.8px] lg:border-gray-300 lg:shadow-md rounded-[2rem] z-20 flex justify-center items-center lg:bg-slate-100 bg-transparent">
                <LoginCard>
                    <div className="flex flex-col item-center justify-center items-center">
                        <h1 className="text-primary-text text-xl">Hello there!</h1>
                        <p className="text-md text-tersier-text">Can't wait for you to join! </p>
                    </div>
                    <DangerAlert action={{alertMsg, isDangerAlertHidden}} />
                    <SuccessAlert action={{alertMsg, isSuccAlertHidden}}/>
                    <WarningAlert action={{alertMsg, isWarnAlertHidden}}/>
                    <form action="" method="post" className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2 justify-start">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" className={`w-full h-8 border-[0.8px] ${isUsernameErr == true ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-5 outline-primary`} placeholder="Username"/>  
                            <span className={`${isUsernameErr == true ? 'block' : 'hidden'} text-sm text-red-500 mt-[-5px]`}>Username harus diisi!</span>
                        </div>
                        <div className="flex flex-col gap-2 justify-start">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" className={`w-full h-8 border-[0.8px] ${isEmailErr == true ? 'border-red-500' : 'border-gray-300'}  rounded-md px-3 py-5 outline-primary`} placeholder="Email"/>
                            <span className={`${isEmailErr == true ? 'block' : 'hidden'} text-sm text-red-500 mt-[-5px]`}>Email harus diisi!</span>
                        </div>
                        <div className="flex flex-wrap gap-2 relative">
                            <label htmlFor="password">Password</label>
                            <input type={`${isPassVisible ? "text" : "password"}`} id="password" className={`w-full h-8 border-[0.8px]  ${isPassErr == true ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-5 outline-primary`} placeholder="Password"/>
                            <button className={`w-[2.3rem] h-[2.3rem] bg-white ${isPassVisible ? "flex" : "hidden"} justify-center items-center rounded-sm cursor-pointer absolute top-9 right-[0.07rem] text-slate-500`} type="button" onClick={handlePassInvisible}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 5c3.679 0 8.162 2.417 9.73 5.901c.146.328.27.71.27 1.099c0 .388-.123.771-.27 1.099C20.161 16.583 15.678 19 12 19s-8.162-2.417-9.73-5.901C2.124 12.77 2 12.389 2 12c0-.388.123-.771.27-1.099C3.839 7.417 8.322 5 12 5m0 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8m0 2a2 2 0 1 1 0 4a2 2 0 0 1 0-4"/></g></svg>
                                </button>
                            <button className={`w-[2.3rem] h-[2.3rem] bg-white justify-center items-center rounded-sm cursor-pointer absolute top-9 right-[0.07rem] text-slate-500 ${isPassVisible ? "hidden" : 'flex'}`} type="button" onClick={handlePassVisible}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.343 18.782l-1.932-.518l.787-2.939a11 11 0 0 1-3.237-1.872l-2.153 2.154l-1.414-1.414l2.153-2.154a10.96 10.96 0 0 1-2.371-5.07l1.968-.359a9.002 9.002 0 0 0 17.713 0l1.968.358a10.96 10.96 0 0 1-2.372 5.071l2.154 2.154l-1.414 1.414l-2.154-2.154a11 11 0 0 1-3.237 1.872l.788 2.94l-1.932.517l-.788-2.94a11 11 0 0 1-3.74 0z"/></svg>
                            </button>
                            <span className={`${isPassErr == true ? 'block' : 'hidden'} text-sm text-red-500 mt-[-5px]`} id="passMsg">Password harus diisi!</span>
                        </div>
                        <div className="flex flex-wrap gap-2 relative">
                            <label htmlFor="confPass">Confirm Password</label>
                            <input type={`${isConfPassVisibale ? "text" : "password"}`} id="confPass" className={`w-full h-8 border-[0.8px] ${isPassConfErr == true ? 'border-red-500' : 'border-gray-300'}  rounded-md px-3 py-5 outline-primary`}placeholder="Confirm Password"/>
                            <button className={`w-[2.3rem] h-[2.3rem] bg-white ${isConfPassVisibale ? "flex" : "hidden"} justify-center items-center rounded-sm cursor-pointer absolute top-9 right-[0.07rem] text-slate-500`} type="button" onClick={handleConfPassInvisible}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 5c3.679 0 8.162 2.417 9.73 5.901c.146.328.27.71.27 1.099c0 .388-.123.771-.27 1.099C20.161 16.583 15.678 19 12 19s-8.162-2.417-9.73-5.901C2.124 12.77 2 12.389 2 12c0-.388.123-.771.27-1.099C3.839 7.417 8.322 5 12 5m0 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8m0 2a2 2 0 1 1 0 4a2 2 0 0 1 0-4"/></g></svg>
                                </button>
                            <button className={`w-[2.3rem] h-[2.3rem] bg-white justify-center items-center rounded-sm cursor-pointer absolute top-9  right-[0.07rem] text-slate-500 ${isConfPassVisibale ? "hidden" : 'flex'}`} type="button" onClick={handleConfPassVisible}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.343 18.782l-1.932-.518l.787-2.939a11 11 0 0 1-3.237-1.872l-2.153 2.154l-1.414-1.414l2.153-2.154a10.96 10.96 0 0 1-2.371-5.07l1.968-.359a9.002 9.002 0 0 0 17.713 0l1.968.358a10.96 10.96 0 0 1-2.372 5.071l2.154 2.154l-1.414 1.414l-2.154-2.154a11 11 0 0 1-3.237 1.872l.788 2.94l-1.932.517l-.788-2.94a11 11 0 0 1-3.74 0z"/></svg>
                            </button>
                            <span className={`${isPassConfErr == true ? 'block' : 'hidden'} text-sm text-red-500 mt-[-5px]`} id="confPassMsg">Confirm password harus diisi!</span>
                        </div>
                        <div className="flex justify-center items-center gap-3">
                            <Link>
                                <button type="button" className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" onClick={registerAction}>
                                    Register
                                </button> 
                            </Link>
                            <Link to={"/auth"}>
                                <button type="button" className="flex bg-gray-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75">
                                    Login
                                </button>
                            </Link>
                        </div>
                    </form>
                </LoginCard>
            </div>
        </div>
    )
}


export default Register;