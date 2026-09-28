import TitlePage from "../Components/TitlePage";
import { MainCard, ProductCard } from "../Components/MainCard";
import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { CartProduct } from "../Components/Modals";
import { useEffect, useState } from "react";
import axios from "axios";

const Payment = () => {
    const [isPaymentCash, setIsPaymentCash] = useState(false);
    const [products, setProduct] = useState([]);
    const [chargeTotal, setchargeTotal] = useState(0);
    const [payErrMsg, setPayErrMsg] = useState(null);
    const [nameErrMsg, setNameErrMsg] = useState(null);
    const [payTypeErrMsg, setpayTypeErrMsg] = useState(null);

    const outlietContext = useOutletContext();
    const navigate = useNavigate();

    const rpFormatter = new Intl.NumberFormat("id-ID", {
        style: 'currency',
        currency: 'IDR'
    });

    const handlingPaymentType = () => {
        const elm = event.target;
        elm.value == 1 ? setIsPaymentCash(true) : setIsPaymentCash(false);
}

    const userLogin = localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN) == null ? null :  JSON.parse(localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN));
    const apiuri = import.meta.env.VITE_API_URL;

    let email, idUser;
    if (userLogin != null){
        email = userLogin.email;
        idUser = userLogin.id_user;
    }

    useEffect(() => {
        if (userLogin != null){
            axios.get(`${apiuri}cart/get-all/${idUser}`, {params: {email}})
            .then((res) => {
                const datas = res.data;
                if(datas.status == 200){                    
                    setProduct(datas.cart);
                }
            }).catch(() => {
                outlietContext.openAlertModal("Gagal mengambil data!");
            })
        }
    }, []);

    const payTotal = products.reduce((total, item) => {
      const price = item.product.price || 0;
      const quantity = item.quantity || 0;
      
      return total + (price * quantity);
    }, 0)


    const calculateCharge = (e) => {
        let payment = e.target.value == "" ? 0 : e.target.value;
        let charge = parseFloat(payment) - parseFloat(payTotal);
        if (charge < 0){
            charge = 0;

            setPayErrMsg("Payment tidak boleh kurang dari payment total!");
        } else {
            setPayErrMsg(null);
        }
        
        setchargeTotal(charge);
    }

    const proccedPayment = () => {
        const nameInpt = document.getElementById("customer").value;
        const payType = document.getElementById("paymentType").value;
        let payment = document.getElementById("payment").value;
        if (nameInpt == "" || payType == "default" || payment < payTotal || chargeTotal == ""){
            if (nameInpt == ""){
                setNameErrMsg("Nama Kustomer tidak boleh kosong!");
            } else if(payType == "default"){
                setpayTypeErrMsg("Tipe payment harus dipilih!");
            } else if(payment < payTotal || payment == ""){
                setPayErrMsg("Payment tidak boleh kurang dari payment total!");
            } else {
                setNameErrMsg(null);
                setpayTypeErrMsg(null);
                setPayErrMsg(null);
            }
            return;
        }

        const idProducts = products.map((product) => {
            return product.product._id;
        });

        const idCart = products.map((product) => {
            return product.id;
        });


        const data = {
            email,
            idUser,
            idCart,
            products: idProducts,
            totalPrice: payTotal,
            totalPayment: payment,
            customerName: nameInpt,
            paymentType: payType
        }

        if (payType == 1){
            axios.post(`${apiuri}order/payment/procced`, data)
            .then((res) => {
                const datas = res.data;

                if (datas.status == 200){
                    outlietContext.openAlertModal(datas.msg, 1);
                    outlietContext.getCartLength();
                    navigate("/product");   
                } else {
                    throw new Error("Gagal melakukan pembayaran!");
                }
            }).catch((err) => {
                outlietContext.openAlertModal(err.message, 0);
            })
        }
    }

    let productCard;

    if (products.length > 0){
        productCard = products.map(product=> (
             <CartProduct data={product} key={product.id}/>
        ))

    } else {
        productCard = <p>Tidak ada data</p>
    }

    return (
        <>
            <TitlePage title={'Payment'}/>
            <MainCard>
                <Link to={"/product"} className="underline text-tersier-text mb-3">
                    {"< Kembali"}
                </Link>
                <div className="flex flex-col gap-3 mt-1">
                    <div className="flex flex-col gap-2 md:flex-row items-start justify-between">
                        <label htmlFor="customer" className="w-40">Customer</label>
                        <div className="flex flex-col w-full">
                            <input type="text" name="customer" id="customer" className="w-full border-[0.8px] border-gray-300 rounded-md py-1 px-2 outline-primary" placeholder="Customer" />
                            <span className={`${nameErrMsg != null ? 'block' : 'hidden'} text-sm text-red-500`}>{nameErrMsg}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2  md:flex-row items-start justify-between">
                        <label htmlFor="paymentTyp" className="w-40">Payment Type</label>
                        <div className="flex flex-col w-full">
                            <select name="paymentType" id="paymentType" className="w-full border-[0.8px] border-gray-300 rounded-md py-2 px-2 outline-primary" onChange={handlingPaymentType} defaultValue={"default"}>
                                <option disabled value={"default"}> Payment Type</option>
                                <option key={"1"} value={"1"}> Cash</option>
                                <option key={"2"} value={"2"}> Qris</option>
                            </select>
                            <span className={`${payTypeErrMsg != null ? 'block' : 'hidden'} text-sm text-red-500`}>{payTypeErrMsg}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2  md:flex-row items-start justify-between">
                        <p className="w-40">Orders</p>
                        <div className=" overflow-y-auto w-full max-h-60 flex flex-col">
                            {productCard}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row items-start justify-between">
                        <label htmlFor="paymentTotal" className="w-40">Payment Total</label>
                        <input type="text" name="" id="paymentTotal" className="w-full border-[0.8px] border-gray-300 rounded-md py-1 px-2 outline-primary" placeholder="Payment Total" disabled value={rpFormatter.format(payTotal)}/> 
                    </div>
                    <div className={ isPaymentCash ? "flex flex-col gap-2" : "hidden"}>

                        <div className="flex flex-col gap-2 md:flex-row items-start justify-between">
                            <label htmlFor="payment" className="w-40">Payment</label>
                            <div className="flex flex-col w-full">
                                <input type="number" name="" id="payment" className="w-full border-[0.8px] border-gray-300 rounded-md py-1 px-2 outline-primary" placeholder="Payment" onKeyUp={calculateCharge}/>
                                <span className={`${payErrMsg != null ? 'block' : 'hidden'} text-sm text-red-500`}>{payErrMsg}</span>
                            </div>
                        </div>
                        <div className={`flex flex-col gap-2 md:flex-row items-start justify-between`}>
                            <label htmlFor="chargetotal" className="w-40">Charge Total</label>
                            <input type="text" name="chargetotal" id="chargetotal" className="w-full border-[0.8px] border-gray-300 rounded-md py-1 px-2 outline-primary" placeholder="Charge Total" disabled value={rpFormatter.format(chargeTotal)}/> 
                        </div>
                    </div>

                    <div className="flex justify-end items-end">
                        <button className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button" onClick={proccedPayment}>
                           Process Paymend
                        </button>
                    </div>
                </div>
            </MainCard>
        </>
    )
}

export default Payment;