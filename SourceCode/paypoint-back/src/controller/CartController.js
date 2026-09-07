import Cart from "../model/Cart.js";
import { Product } from "../model/Product.js";



class CartController {
    async addCart(req, res){
        try {
            const {idUser, idProduct} = req.body;
            const product = await Product.findById(idProduct);

            if (product.stock - 1  < 0){
                throw new Error("Stock tidak cukup");
            }
            
            const findCart = await Cart.findOne({
                'product._id': idProduct,
                id_user: idUser
            });
            
            if(findCart != undefined){
                const newQuantity = findCart.quantity + 1;
                await Cart.updateOne({_id: findCart._id}, {$set: {quantity: newQuantity}});
            } else {
                let newProduct = {
                    _id: product._id,
                    name: product.product_name,
                    price: product.price,
                    category: product.category.category,
                    image: {
                        image_url: product.image.image_url,
                        image_name: product.image.image_name
                    }
                }
    
                const cart = new Cart();
                cart.id_user = idUser;
                cart.product = newProduct;
                cart.quantity = 1;
                cart.save();
            }

            return res.status(200).json({msg: "Berhasil menambahkan ke keranjang", status: 200});
        } catch (err) {
            return res.status(200).json({msg: err.message, status: 500});
        }
    }

    async deleteCartById(req, res){
        try {
            const idCart = req.params.idCart;
            await Cart.findByIdAndDelete(idCart);

            return res.status(200).json({msg: "Berhasil menghapus 1 item", status: 200});
        } catch (err) {
            console.log(err);
            return res.status(200).json({msg: err.message, status: 500});
        }
    }
    
    async getAllCartByIdUser(req, res){
        try {
            const {idUser} = req.params;
            const carts = await Cart.find({"id_user": idUser});
            
            const newCarts = carts.map((cart) => {
                let obj = {
                    id: cart.id,
                    product : cart.product,
                    quantity: cart.quantity
                };

                return obj;
            });

            return res.status(200).json({cart: newCarts, status: 200});
        } catch (err) {
            return res.status(200).json({msg: err.message, status: 500});
        }
    }

    async getLengthCartByIdUser(req, res){
        try {
            const {idUser} = req.params;

            const carts = await Cart.find({"id_user": idUser});
            
            return res.status(200).json({cartLength: carts.length, status: 200});
        } catch (err) {
            return res.status(200).json({msg: err.message, status: 500});
        }
    }

    async updateQuantityProduct(req, res){
        try {
            const {cartId, quantity} = req.body;

            await Cart.updateOne({_id: cartId}, {$set: {quantity}});
            return res.status(200).json({msg: "Berhasil update quantity", status: 200});
        } catch (err) {
            return res.status(200).json({msg: err.msg, status: 500});
        }
    }
}

export default CartController;