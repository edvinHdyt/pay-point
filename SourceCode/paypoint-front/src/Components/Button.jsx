
const BtnPrimary = (props) => {
    return (
         <button className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button">
            {props.name}
        </button>
    )
}

const BtnSecondary = (props) => {
    return (
        <button className="flex bg-primary text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button">
            {props.name}
        </button>
    )
}

const BtnTersier = (props) => {
    return (
         <button className="flex bg-gray-400 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button">
            {props.name}
        </button>
    )
}

export  {BtnPrimary, BtnSecondary, BtnTersier}