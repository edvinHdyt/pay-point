require("dotenv").config();

const mongoose = require('mongoose');

const uri = process.env.ATLAS_URI;
const main = async() => {
    const conn = await mongoose.connect(uri);

    console.log("Db connected!");
}

main().catch(err => console.log(err));
