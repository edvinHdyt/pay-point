const AlertError = (props) => {
    return (
        <span className={`${props.isHidden == true ? 'hidden' : 'block'} text-sm text-red-500 font-montserrat mt-[-1rem]`}>{props.msg}</span>
    )
}

const AlertInptErrors = (props) => {
    const arrErrMsg = props.arrErrMsg;
    console.log(arrErrMsg)
    return(
        <>
            {arrErrMsg.map((errMsg) => {
                if(errMsg.isHidden == false){
                    <span className={`block text-sm text-red-500 font-montserrat mt-[-1rem]`}>{errMsg.msg}</span>
                }
            })}
        </>
    )
}

export {AlertError, AlertInptErrors}