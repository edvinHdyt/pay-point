import TitlePage from "../Components/TitlePage";
import { MainCard, ProductCard } from "../Components/MainCard";
import { Link, Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { CartProduct } from "../Components/Modals";
import { useEffect, useState } from "react";
import axios from "axios";
import getCookie from "../lib/GetCookie";
import updateQuantity from "../lib/UpdateQuantity";
import CalculateTotalPrice from "../lib/CalculateTotalPrice";

const Payment = () => {
    const [isPaymentCash, setIsPaymentCash] = useState(false);
    const [products, setProduct] = useState([]);
    const [chargeTotal, setchargeTotal] = useState(0);
    const [payErrMsg, setPayErrMsg] = useState(null);
    const [nameErrMsg, setNameErrMsg] = useState(null);
    const [payTotal, setPayTotal] = useState(0);
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
    const {userLogin, apiuri} = getCookie();

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
                    
                    if (datas.cart.length == 0){
                        navigate("/product");
                        throw new Error("Data keranjang kosong");
                    }

                    setProduct(datas.cart);

                    const calculateTotal = datas.cart.reduce((total, item) => {
                        const price = item.product.price || 0;
                        const quantity = item.quantity || 0;
                        
                        return total + (price * quantity);
                    }, 0);

                    setPayTotal(calculateTotal);
                } else {
                    throw new Error("Gagal mengambil data!");
                }
            }).catch((err) => {
                outlietContext.openAlertModal(err.message, 0);
            })
        }
    }, []);



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

    const updateStatusOrder = (orderId, status) => {
        if (orderId == undefined){
            throw new Error("Order id kosong");
        }

        axios.patch(`${apiuri}order/update/status/${orderId}`, {email, orderId, status, idUser})
        .then((res) => {
            const datas = res.data;
            if (datas.status != 200){
                throw new Error("Gagal update status");
            }
        }).catch((err) => {
            throw new Error(err);
        })
    }

    const getTokenizer = (data) => {
        axios.post(`${apiuri}order/payment/procced/get/token`, {
            email: email,
            order_id: data.order_id,
            customerName: data.customer_name,
            gross_amount: data.gross_amount
        }).then((res) => {
            const datas = res.data;
            if (datas.status == 200){   
                window.snap.pay(datas.data.token, {
                    onSuccess: () => {
                        updateStatusOrder(data.order_id, "Terbayar");
                        outlietContext.getCartLength();
                        navigate("/product");
                        outlietContext.openAlertModal("Pembayaran berhasil!", 1);
                    },
                    onError: (err) => {
                        throw new Error(err);
                    }
                });
            } else {
                throw new Error("Gagal mengambil token");
            }
            
        }).catch((err) => {
            outlietContext.openAlertModal(err.message, 0);
            deleteOrder(data.order_id);
        });
    }

    const deleteOrder = (orderId) => {
        if (orderId != undefined){
            axios.delete(`${apiuri}order/delete/${orderId}`,{params: {
                email,
                orderId
            }}).then((res) => {
                const datas = res.data;
                
                if (datas.status == 200){
                    outlietContext.openAlertModal(datas.msg, 1);
                } else {
                    throw new Error("Gagal menghapus data order!");
                }
            }).catch((err) => {
                outlietContext.openAlertModal(err.message, 0);
                let timeoutId = setTimeout(() => {
                    deleteOrder(orderId);
                }, 500);

                clearTimeout(timeoutId);
            })
        }
    }

    const actionUpdateQuantity = async (liveQuantityVal, cartDataProccess) => {
        const newCartData = await updateQuantity(liveQuantityVal, cartDataProccess);
        
        if (newCartData != false){
            let oldCartData = products;
            oldCartData = oldCartData.map((data) => {
                if (data.id == newCartData.id){
                    data.quantity = newCartData.quantity;
                }

                return data;
            });
            
            setProduct(oldCartData);

            setPayTotal(CalculateTotalPrice(products));
        }
    }

    const proccedPayment = () => {
        const nameInpt = document.getElementById("customer").value;
        const payType = document.getElementById("paymentType").value;
        let payment = document.getElementById("payment").value;

        let paymentValidation;
        if (payType == 1){
            paymentValidation = payment < payTotal;
        } else {
            paymentValidation = false;
            payment = payTotal;
        }

        if (nameInpt == "" || payType == "default" || paymentValidation){            
            if (nameInpt == ""){
                setNameErrMsg("Nama Kustomer tidak boleh kosong!");
            } else if(payType == "default"){
                setpayTypeErrMsg("Tipe payment harus dipilih!");
            } else if(paymentValidation || payment == ""){
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

        // console.log(payType)
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
        } else {
             axios.post(`${apiuri}order/payment/procced`, data)
            .then((res) => {
                const datas = res.data;
                if (datas.status == 200){
                    getTokenizer(datas.data);
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
            <CartProduct data={product} key={product.id} action={{actionUpdateQuantity}}/>
        ));
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