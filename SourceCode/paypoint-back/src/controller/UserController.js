import mongoose, { isObjectIdOrHexString } from "mongoose";
import User from "../model/User.js";
import {ObjectId} from 'mongodb';

class UserController {
    async getUser(req, res){
        try {
            let {userId} = req.body;
            const user = await User.findOne({_id: new ObjectId(userId)});
            res.status(200).json({user, status: 200});
        } catch (error) {
            console.log(error.message);
            res.status(200).json({msg: "Kesalahan Server", status: 500});
        }
    }
}

export default UserController;