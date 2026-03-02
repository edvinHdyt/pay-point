

const DangerAlert = (props) => {
    console.log(props);
    return (
        <>
            <div className={`${props.action.isDangerAlertHidden == true ? "hidden" : ""} bg-red-500 w-full h-10 px-4 py-2 rounded-md text-white`}>
                {props.action.alertMsg}
            </div>
        </>     
    )
}

const SuccessAlert = (props) => {
    return (
        <>
            <div className={`${props.action.isSuccAlertHidden == true ? "hidden" : ""} bg-green-500 w-full h-10 px-4 py-2 rounded-md text-white`}>
                {props.action.alertMsg}
            </div>
        </>
    )
}

const WarningAlert = (props) => {
    return (
        <>
            <div className={` ${props.action.isWarnAlertHidden == true ? "hidden" : ""} bg-yellow-500 w-full h-10 px-4 py-2 rounded-md text-white`}>
                {props.action.alertMsg}      
            </div>
        </>
    )
}



export  {
    DangerAlert,
    SuccessAlert,
    WarningAlert
};