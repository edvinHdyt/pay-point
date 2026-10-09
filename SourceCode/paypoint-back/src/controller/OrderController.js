import Order from "../model/Order.js";
import User from "../model/User.js";
import {Product} from "../model/Product.js"
import Cart from "../model/Cart.js";

class OrderController {
    addNewOrder = async (req, res) => {
        try {
            const date = new Date((new Date).toLocaleString("en-US", {
                timeZone: "Asia/Jakarta"
            }));

            const {
                idUser,
                idCart,
                paymentType,
                customerName,
                totalPrice,
                totalPayment,
                products
            } = req.body;
            const user = await User.findById(idUser);
            const cashback = totalPayment - totalPrice;

            if (cashback < 0){
                throw new Error("Uang pembayaran tidak boleh kurang dari total bayar");
            }
            
            if (user.length == 0){
                throw new Error("pengguna tidak ditemukan!");
            }

            let checkoutProduct;
            if (products.length > 0){
                checkoutProduct = products.map(async (id) => {
                    let product = await Product.findById(id);
                    return {id, name: product.product_name};
                });
                
                checkoutProduct = Promise.all(checkoutProduct).then((res) => {
                    return res;
                });
            }

            const order = new Order();
            let payType;


            if (paymentType == 1){
                payType = "CASH";
                order.status = "Terbayar";
            } else {
                payType = "QRIS";
                order.status = "Belum Dibayar";
            }

            order.payment_type = payType;
            order.customer_name = customerName;
            order.order_date = date;
            order.total_price = totalPrice;
            order.total_payment = totalPayment;
            order.cashback = cashback;
            order.modified_by = user.name;
            order.created_at = date;
            order.product = await checkoutProduct

            await order.save();

            for (let i = 0; i < idCart.length; i++) {
                await Cart.findByIdAndDelete(idCart[i]);
            }


            if (paymentType == 2){

                const data = {
                    order_id: order._id,
                    gross_amount: order.total_price,
                    customer_name: order.customer_name
                }

                return res.status(200).json({data, status: 200});
            }

            return res.status(200).json({msg: "Pembayaran berhasil", status: 200});
        } catch (error) {
            return res.status(200).json({msg: error.message, status: 500});
            
        }
    }

    deelteOrder = async (req, res) => {
        try {
            const {orderId}  = req.body;

            await Order.findByIdAndDelete(orderId);

            return res.status(200).json({msg: "Berhasil hapus order", status: 200});
        } catch (err) {
            return res.status(200).json({msg: err.message, status: 500});
        }
    }
}

export default OrderController;