import express from 'express';
import AuthenticationController from '../controller/AuthenticationController.js';
import User from '../model/User.js';
import cors from 'cors';
const authenticationController = new AuthenticationController();

const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173', // Your frontend origin
  'http://127.0.0.1:5173'  // In case localhost resolves differently
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // If you're using cookies/auth headers
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    console.log("hello world")
    res.send("hello world");
});

const checkEmail = async (req, res, next) => {
    const email = req.body.email;
    
    const user = await User.find({email: email});
    if (user.length == 0){
        next();
    } else {
        res.status(409).json({msg: "Email already used!"});
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
