import { Children } from "react"

const MainCard = ({children}) => {
    return (
         <div className="w-full py-3 px-5 bg-white shadow-sm border-[0.8px] border-slate-300 rounded-md font-montserrat mb-5 mt-3">
            {children}
        </div>
    )
}

const MainCardHalf = ({children}) => {
    return (
         <div className="lg:w-6/12 w-full py-3 px-5 bg-white shadow-sm border-[0.8px] border-slate-300 rounded-md font-montserrat flex justify-center items-center mb-5">
            {children}
        </div>
    )
}

export {MainCard, MainCardHalf};