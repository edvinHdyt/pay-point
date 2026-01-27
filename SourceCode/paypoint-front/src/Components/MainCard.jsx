import { Children } from "react";

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

const ProductCard = (props) => {
    const getImageUrl = (name) => {
        return new URL(`../assets/images/foods/${name}`, import.meta.url).href;
    }

    const toggleModal = () => {
        props.handlingCartLength()
        props.openAlertModal("Success Add Item to Cart!")
    }

    return (
        <div className="w-full  bg-white flex flex-col gap-3 py-2 px-3 border-[0.8px] shadow-sm rounded-md hover:shadow-md hover:cursor-pointer font-montserrat">
            <img src={getImageUrl("americano.jpeg")} alt="americano" className="w-auto h-[20pc]"/>
            <h1 className="text-[1.2rem] font-bold text-primary-text flex justify-center items-center">
                Americano
            </h1>
            
            <div className="flex justify-between item-center flex-row flex-wrap">
                <span className="flex justify-center items-center text-tersier-text gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59s1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42"/></svg> Minuman
                </span>
                <span className="flex justify-end items-end text-tersier-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.025 21v-2.15q-1.325-.3-2.287-1.15t-1.413-2.4l1.85-.75q.375 1.2 1.113 1.825t1.937.625q1.025 0 1.738-.462t.712-1.438q0-.875-.55-1.387t-2.55-1.163q-2.15-.675-2.95-1.612t-.8-2.288q0-1.625 1.05-2.525t2.15-1.025V3h2v2.1q1.25.2 2.063.913t1.187 1.737l-1.85.8q-.3-.8-.85-1.2t-1.5-.4q-1.1 0-1.675.488T9.825 8.65q0 .825.75 1.3t2.6 1q1.725.5 2.613 1.588t.887 2.512q0 1.775-1.05 2.7t-2.6 1.15V21z"/></svg> 23.0000
                </span>
            </div>
            <footer className="flex flex-row md:flex-col gap-2">
                <button className="w-full p-1 px-2 bg-primary border-0 rounded-md flex gap-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" onClick={toggleModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M8.418 3.25c.28-.59.884-1 1.582-1h4c.698 0 1.301.41 1.582 1c.683.006 1.216.037 1.692.223a3.25 3.25 0 0 1 1.426 1.09c.367.494.54 1.127.776 1.998l.742 2.722l.28.841l.024.03c.901 1.154.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91c-.858-3.431-1.287-5.147-.386-6.301l.024-.03l.28-.841l.742-2.722c.237-.871.41-1.505.776-1.999a3.25 3.25 0 0 1 1.426-1.089c.476-.186 1.008-.217 1.692-.222m.002 1.502c-.662.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.176.237-.28.568-.57 1.635l-.57 2.089C6.384 9 7.778 9 9.684 9h4.631c1.907 0 3.3 0 4.32.18l-.569-2.089c-.29-1.067-.394-1.398-.57-1.635a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118A1.75 1.75 0 0 1 14 5.75h-4a1.75 1.75 0 0 1-1.58-.998" clipRule="evenodd"/></svg>
                    Add to Cart
                </button>
            </footer>
        </div>
    )
}

export {MainCard, MainCardHalf, ProductCard};