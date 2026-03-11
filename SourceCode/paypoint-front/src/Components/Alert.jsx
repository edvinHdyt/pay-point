import { Link } from "react-router-dom"

const DangerAlert = (props) => {
    return (
        <>
            <div className={`${props.action.isDangerAlertHidden == true ? "hidden" : ""} bg-red-500 w-full h-auto px-4 py-2 rounded-md text-white`}>
                {props.action.alertMsg}
            </div>
        </>     
    )
}

const SuccessAlert = (props) => {
    return (
        <>
            <div className={`${props.action.isSuccAlertHidden == true ? "hidden" : ""} bg-green-500 w-full h-auto px-4 py-2 rounded-md text-white`}>
                {props.action.alertMsg}
            </div>
        </>
    )
}

const WarningAlert = (props) => {
    return (
        <>
            <div className={` ${props.action.isWarnAlertHidden == true ? "hidden" : ""} bg-yellow-500 w-full h-auto px-4 py-2 rounded-md text-white`}>
                {props.action.alertMsg}      
            </div>
        </>
    )
}

const SuccessAlertVerif = (props) => {
    return (
        <>
            <div className={`${props.action == true ? "hidden" : "" } w-full h-auto bg-green-500 text-white flex px-3 py-5 rounded-md gap-1 items-center justify-center`}>
                <p className="text-md">
                    Sukses untuk verifikasi, silahkan login untuk mengakses akun anda! 
                </p>
                <Link to={"/Auth/Login"}>
                    <button type="button" className="bg-blue-500 p-1 px-2 rounded-md">
                        Login
                    </button>
                </Link>
            </div>
        </>
    )
}

const DangerAlertVerif = (props) => {
    return (
        <>
            <div className={`${props.action.isDangerAlertHide == true ? "hidden" : ""} w-full h-auto bg-red-500 text-white flex px-3 py-5 rounded-md gap-1 items-center justify-center`}>
                <p className="text-md">
                    {props.action.alertMsg}
                </p>
                <button type="button" className="bg-yellow-500 p-1 px-2 rounded-md" onClick={props.action.handlingFormHidetoShow}>
                    Kirim ulang
                </button>
            </div>
        </>
    )
}

const WarningAlertVerif = (props) => {
    return (
        <>
            <div className={`${props.action.isWarningAlertHide == true ? "hidden" : ""} w-full h-auto bg-yellow-500 text-white flex px-3 py-5 rounded-md gap-1 items-center justify-center`}>
                <p className="text-md">
                    {props.action.alertMsg}
                </p>
            </div>
        </>
    )
}

export  {
    DangerAlert,
    SuccessAlert,
    WarningAlert,
    SuccessAlertVerif,
    DangerAlertVerif,
    WarningAlertVerif
};