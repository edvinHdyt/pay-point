import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitlePage from "./TitlePage";

const CartProduct = (props) => {
    const getImageUrl = (name) => {
        return new URL(`../assets/images/foods/${name}`, import.meta.url).href;
    }

    const [quantity, setQuantity] = useState(1);

    const checkQuantity = () => {
        if (quantity > 1){
            setQuantity(quantity - 1);
        }
    }

    const removeProduct = () => {
        const id = event.target.dataset["value"];
        const elm = document.getElementById(`card-${id}`);
        elm.remove();

        props.countItem();
    }

    return (
        <div className={`flex ${props.payment ? 'flex-col' : 'flex-row'} justify-between mb-3 w-auto h-auto`} id={`card-${props.idProduct}`}>
            <div className="flex flex-row gap-3">
                <img src={getImageUrl("americano.jpeg")} alt="americano" className={`${props.payment ? "w-[90px] h-[90px]" : "w-20 h-20"} rounded-md`}/>
                <div className="flex flex-col gap-1">
                    <h1 className="text-1xl font-primary-text">
                        Americano
                    </h1>
                   <p className={`text-[0.8rem] text-tersier-text flex gap-1 ${props.payment ? "": "hidden"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M8 3h8a3 3 0 0 1 3 3v15l-7-3l-7 3V6a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v13.5l6-2.56l6 2.56V6a2 2 0 0 0-2-2z"/></svg> {quantity}x
                   </p>
                    <p className="text-[0.8rem] text-tersier-text flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59s1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42"/></svg>
                        Minuman
                    </p>
                    <p className="text-[0.8rem] text-tersier-text flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M11.025 21v-2.15q-1.325-.3-2.287-1.15t-1.413-2.4l1.85-.75q.375 1.2 1.113 1.825t1.937.625q1.025 0 1.738-.462t.712-1.438q0-.875-.55-1.387t-2.55-1.163q-2.15-.675-2.95-1.612t-.8-2.288q0-1.625 1.05-2.525t2.15-1.025V3h2v2.1q1.25.2 2.063.913t1.187 1.737l-1.85.8q-.3-.8-.85-1.2t-1.5-.4q-1.1 0-1.675.488T9.825 8.65q0 .825.75 1.3t2.6 1q1.725.5 2.613 1.588t.887 2.512q0 1.775-1.05 2.7t-2.6 1.15V21z"/></svg>
                        23.000
                    </p>
                </div>
            </div>
            <div className={`flex items-center gap-2 ${props.payment ? 'hidden' : ''}`}>
                <button className="flex bg-slate-200 rounded-md w-8 h-8 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" onClick={checkQuantity} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13H5v-2h14z"/></svg>
                </button>
                <p className="text-[1rem] ms-2 mr-2">{quantity}</p>
                <button className="flex bg-slate-200 rounded-md w-8 h-8 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" onClick={() => setQuantity(quantity + 1)}>
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></svg>
                </button>
                <button className="flex bg-red-600 rounded-md w-8 h-8 items-center justify-center shadow-sm text-white active:translate-y-[2px] transition duration-75" onClick={removeProduct} data-value={props.idProduct}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-value={props.idProduct}><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" data-value={props.idProduct}/></svg>
                </button>
            </div>
        </div>
        
    )
}

const ModalCart = (props) => {
    const [isCartEmpty, setIsCartEmpty] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        let timerId;
        if (props.isModalCartOpen){
            timerId = setTimeout(() => {
                setIsHidden(false);
            }, 0);
        }else {
            timerId = setTimeout(() => {
                setIsHidden(true);
            }, 500);
        }

        return () => {
            clearTimeout(timerId);
        }
        
    }, [props.isModalCartOpen]);

    const countItem = () => {
        const elm = document.getElementById("products");
        if (elm.childNodes.length == 0){
            setIsCartEmpty(true);
        }
    }

    return (
        <>
            <div className={`bg-white w-10/12 fixed z-50  py-4 px-6 top-[10%] shadow-md rounded-md lg:left-[10rem] left-[10%] font-montserrat min-h-96  ${props.isModalCartOpen ? 'animate-modal-slide-down block translate-y-0' : `animate-modal-slide-up translate-y-[-30rem] ${isHidden ? 'hidden': ''}`}`}>
                <div className="flex justify-between item-center mb-3">
                    <TitlePage title={"Cart"}/>
                    <button className="flex justify-center items-center bg-red-500 text-white w-10 h-10 rounded-md shadow-sm active:translate-y-[2px] transition duration-75 border-[0.8px] border-gray-300" onClick={props.closeModalCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                    </button>
                </div>
                <hr />
                <div className="min-h-60">
                    <div className={`${isCartEmpty ? 'flex' : 'hidden'} justify-center items-center relative top-[7rem]`}>
                            <p className="text-tersier-text ">There's no item in cart</p>
                    </div>

                    <div className="overflow-y-auto max-h-60 mt-3" id="products">
                            <CartProduct idProduct="1" countItem={countItem} />
                            <CartProduct idProduct="2" countItem={countItem}/>
                            <CartProduct idProduct="3" countItem={countItem} />
                    </div>
                </div>
               <div className="flex justify-end mt-3">  
                <Link to={"product/payment"}>
                    <button className="p-2 bg-primary rounded-md shadow-sm active:translate-y-[2px] transition duration-75" onClick={props.closeModalCart}>
                        Checkout Sekarang
                    </button>
                </Link>
               </div>
            </div>
        </>
    )
}

const ModalAlertMsg = (props) => {
    console.log(props.isModalAlertOpen)
    useEffect(() => {
        if (props.isModalAlertOpen){
            setTimeout(() => {
                props.closeAlertModal();
            }, 2000);
        }
    }, [props.isModalAlertOpen]);

    return (
        <div className={`w-auto p-3 bg-green-500 fixed bottom-2 right-5 z-50 shadow-md rounded-md border-[0.8px] border-gray-300 text-white justify-between item-center gap-3 ${props.isModalAlertOpen ? "flex animate-modal-show" : "hidden"}`}>
            <p className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.15 9.6L10 16.75l-3.2-3.2l.7-.71l2.5 2.5l6.44-6.45zM11.5 3c5.25 0 9.5 4.25 9.5 9.5S16.75 22 11.5 22S2 17.75 2 12.5S6.25 3 11.5 3m0 1C6.81 4 3 7.81 3 12.5S6.81 21 11.5 21s8.5-3.81 8.5-8.5S16.19 4 11.5 4"/></svg>
                {props.alertMsg}
            </p>
            <button className="flex justify-center items-center bg-transparent text-white w-6 h-6 rounded-md shadow-sm active:translate-y-[2px] transition duration-75" onClick={props.closeAlertModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275 -.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
            </button>
        </div>
    )
}

export {ModalCart, CartProduct, ModalAlertMsg};