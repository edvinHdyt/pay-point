import User from "../model/User.js";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import doteenv from 'dotenv';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import jwt from 'jsonwebtoken';
doteenv.config();

class AuthenticationController {
    async login(req, res){
        try{
            const {email, password} = req.body;
            
            const user = await User.findOne({email: email});
            
            if (user.length == 0){
                throw new Error("Email or Password wrong!");
            }

            const userPass = user.password;

            const comparePass = await bcrypt.compare(password, userPass);

            if (!comparePass){
                throw new Error("Password wrong!");
            }

            if (user.email_verified_at == undefined){
                throw new Error("Account is not verified!");
            }

            res.status(200).json({msg: "Success Login"});

        }catch(error){
            res.status(500).json({msg: error.message});
        }
    }

    async register(req, res){
        try {
            const {name, email, password} = req.body;
            const modifiedBy = name;
            const date = new Date((new Date).toLocaleString("en-US", {
                timeZone: "Asia/Jakarta"
            }));

            const saltRounds = 10;
            const hashPass = await bcrypt.hash(password, saltRounds);

            const user = new User({
                name,
                email,
                password: hashPass,
                modified_by: modifiedBy,
                created_at: date 
            });
            
            await this.sendEmail(email, name);
            user.save();

            res.status(200).json({msg: 'Success save user', 'id': user._id.toString()});
        } catch (error) {
            res.status(500).json({msg: "Failed to save user"});
        }
    }

    async sendEmail (email, name){        
        try {
            const transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const handlebarOptions = {
                viewEngine: {
                    partialsDir: path.resolve('./src/views/'),
                    defaultLayout: false
                },
                viewPath: path.resolve('./src/views/')
            }

            transporter.use('compile', hbs(handlebarOptions));

            const token = jwt.sign(
                {
                    email: email
                },
                process.env.PAYPOINT_SECRET_KEY,
                {expiresIn: '1m'}
            )

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Verification Email",
                template: 'email',
                context: {
                    name,
                    link: `http:127.0.0.1:3000/verify/${token}`
                }
            });
        } catch (error) {
            throw new Error("Failed to send email");
        }
    }

    async verifyEmail(req, res){

    }
}


export default AuthenticationController;