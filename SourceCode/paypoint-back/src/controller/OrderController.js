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

            
            if (paymentType == 1){
                let payType = "CASH";

                const order = new Order();
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
            }

            return res.status(200).json({msg: "Pembayaran berhasil", status: 200});
        } catch (error) {
            return res.status(200).json({msg: error.msg, status: 500});
            
        }
    }
}

export default OrderController;