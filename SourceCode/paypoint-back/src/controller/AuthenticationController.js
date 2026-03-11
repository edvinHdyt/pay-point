import User from "../model/User.js";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import doteenv from 'dotenv';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import jwt from 'jsonwebtoken';
import { error } from "console";
doteenv.config();

class AuthenticationController {
    async login(req, res){
        try{
            const {email, password} = req.body;
            
            const user = await User.findOne({email: email});
            
            if (user == null){
                throw new Error("Email atau Password salah!");
            }

            const userPass = user.password;

            const comparePass = await bcrypt.compare(password, userPass);

            if (!comparePass){
                throw new Error("Password salah!");
            }

            if (user.email_verified_at == undefined){
                throw new Error("Akun belum terverifikasi, silahakan cek email anda untuk memverifikasi akun");
            }

            res.status(200).json({msg: "Berhasil Login", status: 200, id_user: user.id.toString()});

        }catch(error){
            res.status(200).json({msg: error.message, status: 400});
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

            res.status(200).json({msg: 'Sukses register, mohon cek email anda untuk verifikasi akun sebelum login!', status: 200});
        } catch (error) {
            res.status(200).json({msg: "Gagal untuk register, silahkan coba lagi!", status: 500});
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
                {expiresIn: '1h'}
            )

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Verification Email",
                template: 'email',
                context: {
                    name,
                    link: `${process.env.FRONTEND_URL}/auth/verification/${token}`
                }
            });
        } catch (error) {
            throw new Error("Failed to send email");
        }
    }

    async verifyEmail(req, res){
        const token = req.params.token;
        let emailUser;
        try {
            const decodeToken = jwt.verify(token, process.env.PAYPOINT_SECRET_KEY);
            emailUser = decodeToken.email;
        } catch (error) {
            return res.status(200).json({msg: "token expired", status: 400});
        }

        
        try {
            const user = await User.findOne({email: emailUser});
            if (user.email_verified_at != null){
                throw new Error("Akun sudah diverifikasi");
            }
        } catch (error) {
            return res.status(200).json({msg: error.message, status: 409});
        }
   
        try {
            const date = new Date((new Date).toLocaleString("en-US", {
                timeZone: "Asia/Jakarta"
            }));


            await User.updateOne({email: emailUser} , { $set: {email_verified_at: date}});
            return res.status(200).json({msg: "Sukses verifikasi email, silahkan login", status: 200});
        } catch (error) {
            return res.status(200).json({msg: "Kesalahan server", status: 500});
        }

    }

    async resendVerifyEmail(req, res) {
        const email = req.body.email;
        let name;
        try {
            const user = await User.findOne({email: email});
            if (user.length == 0){
                throw new Error("Email tidak terdaftar!");
            }

            name = user.name;
        } catch (error) {
            res.status(200).json({msg: error.message, status: 409});
        }
        
        try{
            this.sendEmail(email, name);

            res.status(200).json({msg: "Email terkirim", status: 200});
        }catch(error){
            res.status(200).json({msg: "Gagal mengirim email, silahkan coba beberapa saat lagi", status: 500})
        }
    }
}

export default AuthenticationController;