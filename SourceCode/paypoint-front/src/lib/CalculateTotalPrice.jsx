const CalculateTotalPrice = (data) => {
    console.log(data);
    let total = 0;

    if (data.length > 0){
        data.forEach(elm => {
            total += elm.product.price * elm.quantity;
        });
    }

    return total;
}

export default CalculateTotalPrice;