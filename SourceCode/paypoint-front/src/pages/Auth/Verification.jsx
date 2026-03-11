import { useEffect, useState } from "react";
import { SuccessAlertVerif, DangerAlertVerif, DangerAlert, SuccessAlert, WarningAlertVerif } from "../../Components/Alert";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { LoginCard, } from "../../Components/MainCard";
import axios from "axios";

const Verification = () => {
    const [isSuccessAlertHide, setIsSuccessAlertHide] = useState(true);
    const [isDangerAlertHide, setisDangerAlertHide] = useState(true);
    const [isWarningAlertHide, setIsWarningAlertHide] = useState(false);
    const [isEmailErr, setIsEmailErr] = useState(false);
    const [isSuccAlertHidden, setIsSuccessAlertHidden] = useState(true);
    const [isDangerAlertHidden, setisDangerAlertHidden] = useState(true);
    const [isFormResendVerifyHide, setIsFormResendVerifyHide] = useState(true);
    const [alertMsg, setAlertMsg] = useState("");

    const params = useParams();
    const token = params.token;
    const apiUrl = import.meta.env.VITE_API_URL;

    let navigate = useNavigate();

    useEffect(() => {
        setAlertMsg("Sedang memverifikasi akun...");

        axios.patch(`${apiUrl}auth/verify/${token}`, {token}, {headers: 'Content-Type: application/json'})
        .then((res) => {
            setIsWarningAlertHide(true);
            const resData = res.data;
            setisDangerAlertHide(true);

            if (resData.status  > 200 && resData.status != 409){
                throw new Error(resData.msg);
            }else if(resData.status == 409){
                return navigate('/auth');
            }else{
                setTimeout(() => {
                    setIsSuccessAlertHide(false);
                }, 0);
            }
        })
        .catch((err) => {

            setTimeout(() => {
                setAlertMsg(err.message);
                setisDangerAlertHide(false);
                setIsSuccessAlertHide(true);
                setIsWarningAlertHide(true);
            }, 0)
        })
    }, [apiUrl, token]);

    const sendEmailVerify = async () => {
        const email = document.getElementById("email").value;

        if (email == ""){
            setIsEmailErr(true);
        } else {
            setIsEmailErr(false);

            try {
                const res = await axios.post(`${apiUrl}auth/verify/resend-email`, {email}, {headers: {
                    'Content-Type': 'application/json'
                }});
    
                if (res.data.status == 200){
                    setAlertMsg(res.data.msg);
                    setIsSuccessAlertHidden(false);
                    setisDangerAlertHidden(true);

                    setisDangerAlertHide(true);
                    setIsSuccessAlertHide(true);
                }else {
                    setIsSuccessAlertHidden(true);
                    throw new Error(res.data.msg);
                }
            } catch (error) {
                setAlertMsg(error.message);
                setisDangerAlertHidden(false);

                setIsSuccessAlertHide(true);
                setisDangerAlertHide(true);
            }
        }
    }

    const handlingFormHidetoShow = () => {
        setIsFormResendVerifyHide(false);
    }

    return (
        <>
            <div className="px-20 mt-2">
                <SuccessAlertVerif action={isSuccessAlertHide}/>
                <DangerAlertVerif action={{alertMsg, isDangerAlertHide, handlingFormHidetoShow}}/>
                <WarningAlertVerif action={{isWarningAlertHide, alertMsg}}/>

                <div className={`w-full justify-center items-center ${isFormResendVerifyHide == true ? 'hidden' : 'flex'}`}>
                    <LoginCard >
                        <DangerAlert action={{isDangerAlertHidden, alertMsg}} />
                        <SuccessAlert action={{isSuccAlertHidden, alertMsg}} />
                         <div className="flex flex-col items-center justify-center">
                            <h1 className="text-xl">
                                Send verify link
                            </h1>
                        </div>
                         <div className="flex flex-col gap-2 justify-start">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" className={`w-full h-8 border-[0.8px] ${isEmailErr == true ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-5 outline-primary`} placeholder="Email"/>  
                            <span className={`${isEmailErr == true ? 'block' : 'hidden'} text-sm text-red-500 mt-[-5px]`}>Email harus diisi!</span>
                        </div>
                        <button type="button" className="w-full bg-blue-500 rounded-md py-2 text-white shadow-sm active:translate-y-[2px] transition duration-75" onClick={sendEmailVerify}>
                            Send
                        </button>
                    </LoginCard>
                </div>
            </div>
        </>
    )
}

export default Verification;