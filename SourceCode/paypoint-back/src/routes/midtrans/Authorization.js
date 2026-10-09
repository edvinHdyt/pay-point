import midtransClient from "midtrans-client";

class Authorization {
    getToken = async (req, res) => {

        try {
            const {
                order_id,
                gross_amount,
                customer_name,
                } = req.body;
                
                
            const snap = new midtransClient.Snap({
                isProduction : false,
                serverKey : process.env.SERVER_KEY,
                clientKey: process.env.CLIENT_KEY
            });

            const parameter = {
                "transaction_details": {
                    "order_id": order_id,
                    gross_amount
                },
                "customer_details": {
                    customer_name
                }
            }

            const transaction = await snap.createTransaction(parameter);
            
            return res.status(200).json({data: transaction, status: 200});
        } catch (err) {
            return res.status(200).json({msg: err.message.apiResponse.error_messages, status: 500});
        }
      
    }

    
}

export default Authorization;