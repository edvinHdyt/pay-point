import midtransClient from "midtrans-client";

class Authorization {
    getToken = async (req, res) => {
        const snap = new midtransClient.Snap({
            isProduction: true,
            serverKey: process.env.SERVER_KEY
        });
    }
}

export default Authorization;