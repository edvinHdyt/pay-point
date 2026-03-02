import express from 'express';
import AuthenticationController from '../controller/AuthenticationController.js';
import User from '../model/User.js';
const authenticationController = new AuthenticationController();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
});

const checkEmail = async (req, res, next) => {
    const email = req.body.email;
    
    const user = await User.find({email: email});
    if (user.length == 0){
        next();
    } else {
        res.status(500).json({msg: "Email already used!"});
    }
}

app.post("/auth/login", (req, res) => {
    authenticationController.login(req, res);
})

app.post("/auth/register", checkEmail, (req, res) => {
    authenticationController.register(req, res);
});

app.post("/auth/verify/:token", (req, res) => {

});

export default app;
