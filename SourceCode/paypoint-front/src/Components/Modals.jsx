import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TitlePage from "./TitlePage";
import { BtnPrimary } from "./Button";
import axios from "axios";
import getCookie from "../lib/GetCookie";
import CalculateTotalPrice from "../lib/CalculateTotalPrice";
import updateQuantity from "../lib/UpdateQuantity";

const CartProduct = (props) => {
    const product = props.data.product;

    const [quantity, setQuantity] = useState(props.data.quantity);

    const rpFormatter = new Intl.NumberFormat("id-ID", {
        style: 'currency',
        currency: 'IDR'
    });

    const removeProduct = (e) => {
        const id = e.target.dataset["value"];
        props.action.deleteCartAction(id);
    }

    const increseQuantity = () => {
        const liveQuantityVal = quantity + 1;
        setQuantity(quantity + 1);
        props.action.actionUpdateQuantity(liveQuantityVal, props.data);
    }

    const decreseQuantity = () => {
        if (quantity > 1){
            const liveQuantityVal = quantity - 1;
            setQuantity(quantity - 1);
            props.action.actionUpdateQuantity(liveQuantityVal, props.data);
        } else {
            props.action.deleteCartAction(props.data.id);
        }
    }

    return (
        <div className={`flex ${props.payment ? 'flex-col' : 'flex-row'} justify-between mb-3 w-auto h-auto`} id={`card-${props.data.id}`} key={props.data.id}>
            <div className="flex flex-row gap-3" >
                <img src={product.image.image_url} alt={product.image.image_name} className={`${props.payment ? "w-[90px] h-[90px]" : "w-20 h-20"} rounded-md`}/>
                <div className="flex flex-col gap-1">
                    <h1 className="text-1xl font-primary-text">
                        {product.name}
                    </h1>
                   <p className={`text-[0.8rem] text-tersier-text flex gap-1 ${props.payment ? "": "hidden"}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M8 3h8a3 3 0 0 1 3 3v15l-7-3l-7 3V6a3 3 0 0 1 3-3m0 1a2 2 0 0 0-2 2v13.5l6-2.56l6 2.56V6a2 2 0 0 0-2-2z"/></svg> {quantity}x
                   </p>
                    <p className="text-[0.8rem] text-tersier-text flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.11 0-2 .89-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59s1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42"/></svg>
                        {product.category}
                    </p>
                    <p className="text-[0.8rem] text-tersier-text flex gap-1">  
                        {rpFormatter.format(product.price)}
                    </p>
                    <p className="text-[0.8rem] text-tersier-text flex gap-1 sm:hidden">  
                        Quantity: {quantity}
                    </p>
                </div>
            </div>
            <div className={`flex items-center gap-2 ${props.payment ? 'hidden' : ''} flex-col w-20 sm:flex-row sm:w-auto`}>
                <button className="flex bg-slate-200 rounded-md w-8 h-8 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" onClick={decreseQuantity} button="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13H5v-2h14z"/></svg>
                </button>
                <p className="text-[1rem] ms-2 mr-2 hidden sm:block">{quantity}</p>
                <button className="flex bg-slate-200 rounded-md w-8 h-8 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" onClick={increseQuantity} button="button">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></svg>
                </button>
                <button className="flex bg-red-600 rounded-md w-8 h-8 items-center justify-center shadow-sm text-white active:translate-y-[2px] transition duration-75" onClick={removeProduct} data-value={props.data.id} button="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" data-value={props.data.id}><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z" data-value={props.data.id}/></svg>
                </button>
            </div>
        </div>
        
    )
}

const ModalCart = (props) => {
    const [isCartEmpty, setIsCartEmpty] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    const [cartData, setCartData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const {userLogin, apiuri} = getCookie();
    const getCartLengthF = props.action.getCartLength;
    const navigate = useNavigate();


    const actionUpdateQuantity = async (liveQuantityVal, cartDataProccess) => {
        const newCartData = await updateQuantity(liveQuantityVal, cartDataProccess);
        
        if (newCartData != false){
            let oldCartData = cartData;
            oldCartData = oldCartData.map((data) => {
                if (data.id == newCartData.id){
                    data.quantity = newCartData.quantity;
                }

                return data;
            });
            
            setCartData(oldCartData);

            setTotalPrice(CalculateTotalPrice(cartData));
        }
    }

    const rpFormatter = new Intl.NumberFormat("id-ID", {
        style: 'currency',
        currency: 'IDR'
    });

    useEffect(() => {
        if(props.isModalCartOpen){
            axios.get(`${apiuri}cart/get-all/${userLogin.id_user}`, {params: {email: userLogin.email}})
            .then((res) => {
                const data = res.data;
                if (data.status == 200){
                    if(data.cart.length == 0){
                        setIsCartEmpty(true);
                    } else {
                        setIsCartEmpty(false);
                    }

                    const total = CalculateTotalPrice(data.cart);
                    setTotalPrice(total);
                    setCartData(data.cart);
                } else {
                    throw new Error("Terjadi kesalahan");
                }
            }).catch((err) => {
                props.openAlertModal(err.message, 0)
            })
        }
    }, [props.isModalCartOpen]);

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

    

    const deleteCartAction = (cartId) => {        
        axios.delete(`${apiuri}cart/delete/${cartId}`, {params: {email: userLogin.email}})
        .then((res) => {
            const data = res.data;
            if(data.status == 200){
                countItem();
                getCartLengthF();
                const newArrCart = cartData.filter((elm) => {
                    return elm.id != cartId;
                });

                setCartData(newArrCart);
                
                const total = CalculateTotalPrice(newArrCart);
                setTotalPrice(total);
            } else {
                throw new Error("Gagal menghapus item");
            }
        }). catch((err) => {
            props.openAlertModal(err.message, 0);
        })
    }

    const redirectPaymentPage = () => {
        const cartLengt = props.action.cartLength;
        if (cartLengt == 0){
            props.openAlertModal("Tidak ada item di cart", 0);
            return;
        }

        navigate("product/payment");
        props.closeModalCart();
    }


    const openAlertModalF = props.openAlertModal;
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
                        {cartData.map((cart) => (
                            <CartProduct data={cart} payment={false} action={{actionUpdateQuantity, apiuri, userLogin, openAlertModalF, countItem, getCartLengthF, deleteCartAction}} key={cart.id}/>
                        ))}
                    </div>
                </div>
               <div className="flex justify-end mt-3">
                <span className="me-3 mt-1 text-tersier-text">
                    Total: {rpFormatter.format(totalPrice)}
                </span>
                <button className="p-2 bg-primary rounded-md shadow-sm active:translate-y-[2px] transition duration-75" onClick={redirectPaymentPage}>
                    Checkout Sekarang
                </button>
               </div>
            </div>
        </>
    )
}

const ModalAlertMsg = (props) => {
    useEffect(() => {
        let timerId;

        if (props.sendProps.isModalAlertOpen){
            timerId = setTimeout(() => {
                props.sendProps.closeAlertModal();
            }, 2000);
        }

        return(() => {
            clearTimeout(timerId);
        })
    }, [
        props.sendProps
    ]);

    let colorAlert;
    let textAlert;

    switch (props.sendProps.typeAlertModal) {
        case 0:
            colorAlert = "bg-red-500";
            textAlert = "text-white";
            break;
        case 2:
            colorAlert = "bg-yellow-500";
            textAlert = "text-black";
            break
        default:
            colorAlert = "bg-green-500";
            textAlert = "text-white";
            break;
    }

    let alertIcon;
    if (props.sendProps.typeAlertModal == 2 || props.sendProps.typeAlertModal == 0){
        alertIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30"><path d="M0 0h32v32H0z" fill="none" /> <path fill="currentColor" d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14s14-6.3 14-14S23.7 2 16 2m-1.1 6h2.2v11h-2.2zM16 25c-.8 0-1.5-.7-1.5-1.5S15.2 22 16 22s1.5.7 1.5 1.5S16.8 25 16 25" /></svg>
    } else{
        alertIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.15 9.6L10 16.75l-3.2-3.2l.7-.71l2.5 2.5l6.44-6.45zM11.5 3c5.25 0 9.5 4.25 9.5 9.5S16.75 22 11.5 22S2 17.75 2 12.5S6.25 3 11.5 3m0 1C6.81 4 3 7.81 3 12.5S6.81 21 11.5 21s8.5-3.81 8.5-8.5S16.19 4 11.5 4"/></svg>;
    }

    return (
        <div className={`w-auto p-3 ${colorAlert} fixed bottom-2 right-5 z-50 shadow-md rounded-md border-[0.8px] border-gray-300 ${textAlert} justify-between item-center gap-3 ${props.sendProps.isModalAlertOpen ? "flex animate-modal-show" : "hidden"}`}>
            <p className="flex gap-2">
                {alertIcon}
                {props.sendProps.alertMsg}
            </p>
            <button className="flex justify-center items-center bg-transparent text-white w-6 h-6 rounded-md shadow-sm active:translate-y-[2px] transition duration-75" onClick={props.sendProps.closeAlertModal}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275 -.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
            </button>
        </div>
    )
}

const ModalConfEmail = (props) => {
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
       let timerId;

       if(props.isModalConfEmaiLOpen){
            timerId = setTimeout(() => {
                setIsHidden(false);
            }, 0);
       } else {
            timerId = setTimeout(() => {
                setIsHidden(true);
            }, 200);
       }

       return () => {
            clearTimeout(timerId);
       }
    }, [props.isModalConfEmaiLOpen]);

    const openModalChPass = () => {
        props.funcModal.closeConfEmailModal()
        props.funcModal.openChangePassModal()
    }

    return(
        <>
            <div className={`md:w-[33rem] w-[28rem] p-3 bg-white z-50 fixed md:top-36 top-44 lg:left-[35%] left-[5%] sm:left-[20%] border-[0.8px] border-gray-200 shadow-sm rounded-md min-h-56 px-5 ${props.isModalConfEmaiLOpen ? 'animate-modal-slide-down block translate-y-0' : `animate-modal-slide-up translate-y-[-30rem] ${isHidden ? 'hidden': ''}`} `}>
                <div className="flex justify-between mb-3 items-center">
                    <TitlePage title={"Konfirmasi Email"}/>
                    <button className="flex justify-center items-center bg-red-500 text-white w-10 h-10 rounded-md shadow-sm active:translate-y-[2px] transition duration-75 border-[0.8px] border-gray-300" onClick={props.funcModal.closeConfEmailModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                    </button>
                </div>
                <hr />
                <form action="" method="post" className="relative min-h-[9rem]">
                    <div className="flex gap-3 flex-col mb-3">
                        <div className="flex flex-wrap gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" className="w-full h-8 border-[0.8px] border-gray-300 rounded-md px-3 py-5 outline-primary" placeholder="Email"/>
                        </div>
                    </div>
                    
                    <div className="flex justify-end absolute bottom-0 right-0">
                         <button className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button" onClick={openModalChPass}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

const ModalChangePass = (props) => {
    const [isHidden, setIsHidden] = useState(true);
    const [isPassVisible, setIsPassVisibel] = useState(false);
    const [isConfPassVisible, setIsConfPassVisible] = useState(false);

    useEffect(() => {
       let timerId;

       if(props.isModalChangePassOpen){
            timerId = setTimeout(() => {
                setIsHidden(false);
            }, 0);
       } else {
            timerId = setTimeout(() => {
                setIsHidden(true);
            }, 200);
       }

       return () => {
            clearTimeout(timerId);
       }
    }, [props.isModalChangePassOpen]);

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

    return(
        <>
            <div className={`sm:w-[33rem] w-[28rem] p-3 bg-white z-50 fixed md:top-36 top-44 lg:left-[35%] md:left-[20%] left-[5%] border-[0.8px] border-gray-200 shadow-sm rounded-md min-h-56 px-5 ${props.isModalChangePassOpen ? 'animate-modal-slide-down block translate-y-0' : `animate-modal-slide-up translate-y-[-30rem] ${isHidden ? 'hidden': ''}`} `}>
                <div className="flex justify-between mb-3 items-center">
                    <TitlePage title={"Ubah Password"}/>
                    <button className="flex justify-center items-center bg-red-500 text-white w-10 h-10 rounded-md shadow-sm active:translate-y-[2px] transition duration-75 border-[0.8px] border-gray-300" onClick={props.closeChangePassModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                    </button>
                </div>
                <hr />
                <form action="" method="post" >
                    <div className="flex gap-3 flex-col mb-3">
                        <div className="flex flex-wrap gap-2 relative">
                            <label htmlFor="password">New Password</label>
                            <input type={`${isPassVisible ? "text" : "password"}`} id="password" className="w-full h-8 border-[0.8px] border-gray-300 rounded-md px-3 py-5 outline-primary" placeholder="Password"/>
                            <button className={`w-[2.3rem] h-[2.3rem] bg-white ${isPassVisible ? "flex" : "hidden"} justify-center items-center rounded-sm cursor-pointer absolute bottom-[0.05rem] right-[0.07rem] text-slate-500`} type="button" onClick={handlePassInvisible}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 5c3.679 0 8.162 2.417 9.73 5.901c.146.328.27.71.27 1.099c0 .388-.123.771-.27 1.099C20.161 16.583 15.678 19 12 19s-8.162-2.417-9.73-5.901C2.124 12.77 2 12.389 2 12c0-.388.123-.771.27-1.099C3.839 7.417 8.322 5 12 5m0 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8m0 2a2 2 0 1 1 0 4a2 2 0 0 1 0-4"/></g></svg>
                            </button>
                            <button className={`w-[2.3rem] h-[2.3rem] bg-white justify-center items-center rounded-sm cursor-pointer absolute bottom-[0.05rem] right-[0.07rem] text-slate-500 ${isPassVisible ? "hidden" : 'flex'}`} type="button" onClick={handlePassVisible}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.343 18.782l-1.932-.518l.787-2.939a11 11 0 0 1-3.237-1.872l-2.153 2.154l-1.414-1.414l2.153-2.154a10.96 10.96 0 0 1-2.371-5.07l1.968-.359a9.002 9.002 0 0 0 17.713 0l1.968.358a10.96 10.96 0 0 1-2.372 5.071l2.154 2.154l-1.414 1.414l-2.154-2.154a11 11 0 0 1-3.237 1.872l.788 2.94l-1.932.517l-.788-2.94a11 11 0 0 1-3.74 0z"/></svg>
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 relative">
                            <label htmlFor="confPass">Confirm Password</label>
                            <input type={`${isConfPassVisible ? "text" : "password"}`} id="confPass" className="w-full h-8 border-[0.8px] border-gray-300 rounded-md px-3 py-5 outline-primary" placeholder="Confirm Password"/>
                            <button className={`w-[2.3rem] h-[2.3rem] bg-white ${isConfPassVisible ? 'flex' : 'hidden'} justify-center items-center rounded-sm cursor-pointer absolute bottom-[0.05rem] right-[0.07rem] text-slate-500`} type="button" onClick={handleConfPassInvisible}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 5c3.679 0 8.162 2.417 9.73 5.901c.146.328.27.71.27 1.099c0 .388-.123.771-.27 1.099C20.161 16.583 15.678 19 12 19s-8.162-2.417-9.73-5.901C2.124 12.77 2 12.389 2 12c0-.388.123-.771.27-1.099C3.839 7.417 8.322 5 12 5m0 3a4 4 0 1 0 0 8a4 4 0 0 0 0-8m0 2a2 2 0 1 1 0 4a2 2 0 0 1 0-4"/></g></svg>
                            </button>
                            <button className={`w-[2.3rem] h-[2.3rem] bg-white justify-center items-center rounded-sm cursor-pointer absolute bottom-[0.05rem] right-[0.07rem] text-slate-500 ${isConfPassVisible ? "hidden" : "flex"}`}  type="button" onClick={handleConfPassVisible}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9.343 18.782l-1.932-.518l.787-2.939a11 11 0 0 1-3.237-1.872l-2.153 2.154l-1.414-1.414l2.153-2.154a10.96 10.96 0 0 1-2.371-5.07l1.968-.359a9.002 9.002 0 0 0 17.713 0l1.968.358a10.96 10.96 0 0 1-2.372 5.071l2.154 2.154l-1.414 1.414l-2.154-2.154a11 11 0 0 1-3.237 1.872l.788 2.94l-1.932.517l-.788-2.94a11 11 0 0 1-3.74 0z"/></svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex justify-end">
                         <button className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button" >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

const ModalConfDelete = (props) => {
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
       let timerId;

       if(props.sendProps.isModalConfDeleteOpen){
            timerId = setTimeout(() => {
                setIsHidden(false);
            }, 0);
       } else {
            timerId = setTimeout(() => {
                setIsHidden(true);
            }, 200);
       }

       return () => {
            clearTimeout(timerId);
       }
    }, [props.sendProps.isModalConfDeleteOpen]);


    const deleteAction = () => {
        props.sendProps.fDeleteComp();
        props.sendProps.closeModalConfDelete()

    }

    return(
        <>
            <div className={`md:w-[33rem] w-[28rem] p-3 bg-white z-50 fixed md:top-36 top-44 lg:left-[35%] left-[5%] sm:left-[20%] border-[0.8px] border-gray-200 shadow-sm rounded-md min-h-56 px-5 ${props.sendProps.isModalConfDeleteOpen ? 'animate-modal-slide-down block translate-y-0' : `animate-modal-slide-up translate-y-[-30rem] ${isHidden ? 'hidden': ''}`} `}>
                <div className="flex justify-between mb-3 items-center">
                    <TitlePage title={"Konfirmasi"}/>
                    <button className="flex justify-center items-center bg-red-500 text-white w-10 h-10 rounded-md shadow-sm active:translate-y-[2px] transition duration-75 border-[0.8px] border-gray-300" onClick={props.sendProps.closeModalConfDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                    </button>
                </div>
                <hr />
                <div className="flex min-h-[6rem] justify-center align-middle items-center">
                    <p className="text-md font-gibed">
                        {props.sendProps.alertMsg}
                    </p>
                </div>
                <div className="flex gap-2 justify-end relative bottom-0">
                    <button className="flex bg-stone-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button" onClick={props.sendProps.closeModalConfDelete}>
                        Cancel
                    </button>
                    <button className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button" onClick={deleteAction}>
                        Ok
                    </button>
                </div>
            </div>
        </>
    )
}
export {
    ModalCart,
    CartProduct,
    ModalAlertMsg,
    ModalConfEmail,
    ModalChangePass,
    ModalConfDelete
};