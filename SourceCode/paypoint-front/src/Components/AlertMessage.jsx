const AlertError = (props) => {
    return (
        <span className={`${props.isHidden == true ? 'hidden' : 'block'} text-sm text-red-500 font-montserrat mt-[-1rem]`}>{props.msg}</span>
    )
}

export {AlertError}