import axios from "axios";
import getCookie from "./GetCookie";
import CalculateTotalPrice from "./CalculateTotalPrice";
const updateQuantity = async (newQuantity, cartData) => {
    const {userLogin, apiuri} = getCookie();
    let obj = {
        cartId: cartData.id,
        quantity: newQuantity,
        email: userLogin.email
    };

    let objRes = axios.patch(`${apiuri}cart/update/quantity`, obj)
    .then((res) => {
        const data = res.data;
        if(data.status == 200){
            cartData.quantity = newQuantity;
            cartData = {
                id: cartData.id,
                quantity: cartData.quantity
            }

            return cartData;
        } else {
            throw new Error("Gagal memperbaharui quantity");
        }
    }).catch(() => {
        objRes = false;
        return objRes;
    });

    return objRes;
}   

export default updateQuantity;