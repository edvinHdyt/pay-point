import Order from "../model/Order.js";
import User from "../model/User.js";
import {Product} from "../model/Product.js"
import Cart from "../model/Cart.js";
import PaymentType from "../utils/PaymentType.js";
import TIMEFORMAT from "../utils/Time.js";

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
                products,
                quantities
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
                let i = 0;
                checkoutProduct = products.map(async (id) => {
                    
                    let product = await Product.findById(id);
                    let quantity = quantities[i];
                    i++;
                    return  {id, name: product.product_name, price: product.price, quantity};
                });
                
                checkoutProduct = Promise.all(checkoutProduct).then((res) => {
                    return res;
                });
            }
            const order = new Order();
            let payType;


            if (paymentType == 1){
                payType = PaymentType.CASH;
                order.status = "Terbayar";
            } else {
                payType = paymentType.QRIS;
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
            order.updated_at = date;
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

    deleteOrder = async (req, res) => {
        try {
            const {orderId}  = req.body;

            await Order.findByIdAndDelete(orderId);

            return res.status(200).json({msg: "Berhasil hapus order", status: 200});
        } catch (err) {
            return res.status(200).json({msg: err.message, status: 500});
        }
    }

    updateStatusOrder = async(req,res) => {
        try {
            const date = new Date((new Date).toLocaleString("en-US", {
                timeZone: "Asia/Jakarta"
            }));
            const {orderId, status, idUser} = req.body;

            const user = await User.findById(idUser);
            
            if(user == undefined || user.length == 0){
                throw new Error("User tidak ketemu!");
            }

            const order = await Order.findById(orderId);
            order.status = status;
            order.updated_at = date;
            order.modified_by = user.name;
            await order.save();

        return res.status(200).json({msg: "Berhasil update status", status: 200});
        } catch (err) {
            return res.status(200).json({msg: error.message, status: 500});
        }
    }

    getAllOrder = async (req, res) => {
        try {
            const orders = await Order.find();
            const newOrder = this.makeOrder(orders);

            res.status(200).json({data: newOrder, status: 200});
        } catch (err) {
            res.status(200).json({msg: err.message, status: 500});
        }
    }

    getOrderByTime = async (req, res) => {
        try {
            let {startDate, endDate} = req.query;

            startDate = TIMEFORMAT.tz(startDate).startOf("day").toDate();
            endDate = TIMEFORMAT.tz(endDate).endOf("day").toDate();

            const orders = await Order.find({
                order_date: {
                    $gte: startDate,
                    $lte: endDate,
                }
            });
            
            const newOrder = this.makeOrder(orders);
            res.status(200).json({data: newOrder, status: 200});
        } catch (err) {
            return res.status(200).json({msg: err.message});
        }
    }

    makeOrder = (orders) => {
        return orders.map((order, i) => {
            let obj = [];

            order.product.forEach((elm, i) => {
                obj.push({
                    id: order._id,
                    customer_name: order.customer_name,
                    product_name: order.product[i].name,
                    product_price: order.product[i].price,
                    quantity: order.product[i].quantity,
                    price: order.total_price,
                    total_payment: order.total_payment,
                    cashback: order.cashback,
                    order_date: order.created_at,
                    status: order.status,
                    manage_by: order.modified_by
                })
            });

            return obj;
        });
    }
}

export default OrderController;