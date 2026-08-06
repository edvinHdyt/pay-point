import express from 'express';
import multer from 'multer';
import AuthenticationController from '../controller/AuthenticationController.js';
import UserController from '../controller/UserController.js';
import CategoryController from '../controller/CategoryController.js';
import ProductController from '../controller/ProductController.js';
import User from '../model/User.js';
import cors from 'cors';
const authenticationController = new AuthenticationController();
const userController = new UserController();
const categoryController = new CategoryController();
const productController = new ProductController();
const app = express();
app.use(express.json());

// const storage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, "D:/Web-Devel/Project/PayPoint/SourceCode/assets/FileUpload/");
//     },

//     filename: function(req, file, cb){
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

const storage = multer.memoryStorage();
const upload = multer({storage: storage})

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

app.post("/user/get", (req, res) => {
    userController.getUser(req, res);
})

const checkEmail = async (req, res, next) => {
    const email = req.body.email;
    
    const user = await User.find({email: email});
    if (user.length == 0){
        next();
    } else {
        res.status(200).json({msg: "Email sudah digunakan!", status: 409});
    }
}

const checkUserExist = async(req, res, next) => {

  const email = req.body.email;

  const user = await User.find({email: email});
    if (user.length > 0){
        next();
    } else {
        res.status(200).json({msg: "Email tidak terdaftar!", status: 409});
    }
}

const checkUserExistWithGet = async(req,res, next) => {
    const email = req.query.email;
    const user = await User.find({email: email});
        if (user.length > 0){
            next();
        } else {
            res.status(200).json({msg: "Email tidak terdaftar!", status: 409});
        }
}

app.post("/auth/login", (req, res) => {
    authenticationController.login(req, res);
})

app.post("/auth/register", checkEmail, (req, res) => {
    authenticationController.register(req, res);
});

app.post("/auth/verify/resend-email", checkUserExist, (req, res) => {
    authenticationController.resendVerifyEmail(req, res);
});

app.post("/category/add", checkUserExist, (req, res) => {
    categoryController.addCategory(req, res);
});

app.post("/product/add",upload.single('fileProduct'), checkUserExist,  (req,  res) => {
    productController.addProduct(req, res);
})

app.get("/category/get", checkUserExistWithGet, (req, res) => {
    categoryController.getCategory(req, res);
}) 

app.get("/category/get/one", checkUserExistWithGet, (req, res) => {
    categoryController.getOneCategory(req,res);
});

app.get("/product/get", checkUserExistWithGet, (req, res) => {
    productController.getProduct(req, res);
});

app.delete("/category/delete/:id", checkUserExistWithGet, (req, res) => {
    categoryController.deleteCategory(req, res);
});

app.patch("/category/update/:id", checkUserExist, (req, res) => {
    categoryController.updateCategory(req, res);
})

app.patch("/auth/verify/:token", (req, res) => {
    authenticationController.verifyEmail(req, res);
});

export default app;
