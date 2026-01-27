import TitlePage from "../Components/TitlePage";
import { MainCard } from "../Components/MainCard";
import { Link } from "react-router-dom";
import { CartProduct } from "../Components/Modals";
import { useState } from "react";

const Payment = () => {
    const [isPaymentCash, setIsPaymentCash] = useState(false);

    const handlingPaymentType = () => {
        const elm = event.target;
        elm.value == 1 ? setIsPaymentCash(true) : setIsPaymentCash(false);
    }

    return (
        <>
            <TitlePage title={'Payment'}/>

            <MainCard>
                <Link to={"/product"} className="underline text-tersier-text mb-3">
                    {"< Kembali"}
                </Link>
                <form action="" className="flex flex-col gap-3 mt-1">
                    <div className="flex flex-col gap-2 md:flex-row items-start justify-between">
                        <label htmlFor="customer" className="w-40">Customer</label>
                        <input type="text" name="" id="customer" className="w-full border-[0.8px] border-gray-300 rounded-md py-1 px-2 outline-primary" placeholder="Customer"/>
                    </div>
                    <div className="flex flex-col gap-2  md:flex-row items-start justify-between">
                        <label htmlFor="paymentTyp" className="w-40">Payment Type</label>
                        <select name="" id="" className="w-full border-[0.8px] border-gray-300 rounded-md py-2 px-2 outline-primary" onChange={handlingPaymentType}>
                            <option disabled selected> Payment Type</option>
                            <option value={"1"}> Cash</option>
                            <option value={"2"}> Qris</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2  md:flex-row items-start justify-between">
                        <p className="w-40">Orders</p>
                        <div className="grid sm:grid-cols-2 grid-cols-1 overflow-y-auto w-full max-h-60">
                            <CartProduct payment={true} />
                            <CartProduct payment={true} />
                            <CartProduct payment={true} />
                            <CartProduct payment={true} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row items-start justify-between">
                        <label htmlFor="paymentTotal" className="w-40">Payment Total</label>
                        <input type="number" name="" id="paymentTotal" className="w-full border-[0.8px] border-gray-300 rounded-md py-1 px-2 outline-primary" placeholder="Payment Total" disabled/> 
                    </div>
                    <div className={ isPaymentCash ? "flex flex-col gap-2" : "hidden"}>

                        <div className="flex flex-col gap-2 md:flex-row items-start justify-between">
                            <label htmlFor="payment" className="w-40">Payment</label>
                            <input type="number" name="" id="payment" className="w-full border-[0.8px] border-gray-300 rounded-md py-1 px-2 outline-primary" placeholder="Payment" /> 
                        </div>
                        <div className={`flex flex-col gap-2 md:flex-row items-start justify-between`}>
                            <label htmlFor="changeTotal" className="w-40">Change Total</label>
                            <input type="number" name="" id="changeTotal" className="w-full border-[0.8px] border-gray-300 rounded-md py-1 px-2 outline-primary" placeholder="Change Total" disabled/> 
                        </div>
                    </div>

                    <div className="flex justify-end items-end">
                        <button className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button">
                           Process Paymend
                        </button>
                    </div>
                </form>
            </MainCard>
        </>
    )
}

export default Payment;