import express from 'express';
import multer from 'multer';
import AuthenticationController from '../controller/AuthenticationController.js';
import UserController from '../controller/UserController.js';
import CategoryController from '../controller/CategoryController.js';
import ProductController from '../controller/ProductController.js';
import CartController from '../controller/CartController.js';
import OrderController from '../controller/OrderController.js';
import User from '../model/User.js';
import cors from 'cors';
const authenticationController = new AuthenticationController();
const userController = new UserController();
const categoryController = new CategoryController();
const productController = new ProductController();
const cartController = new CartController();
const orderController = new OrderController();
const app = express();
app.use(express.json());

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

app.post("/cart/add", checkUserExist, (req, res) => {
    cartController.addCart(req, res);
});

app.post("/order/payment/procced", checkUserExist, (req, res) => {
    orderController.addNewOrder(req, res);
});

app.post("/product/add",upload.single('fileProduct'), checkUserExist,  (req,  res) => {
    productController.addProduct(req, res);
});


app.get("/category/get", checkUserExistWithGet, (req, res) => {
    categoryController.getCategory(req, res);
}) 

app.get("/category/get/one", checkUserExistWithGet, (req, res) => {
    categoryController.getOneCategory(req,res);
});

app.get("/product/get", checkUserExistWithGet, (req, res) => {
    productController.getProduct(req, res);
});

app.get("/product/get/one", checkUserExistWithGet, (req, res) => {
    productController.getOneProduct(req, res);
});

app.get("/product/get/category/:id", checkUserExistWithGet, (req, res) => {
    productController.getProductByCategory(req, res);
});

app.get('/product/get/price-range', checkUserExistWithGet, (req, res) => {
    productController.getPriceRange(req, res);
});

app.get("/product/get/price-range/:id", checkUserExistWithGet, (req, res) => {
    productController.getProductByPriceRange(req, res);
});

app.get("/cart/get-all/:idUser", checkUserExistWithGet, (req, res) => {
    cartController.getAllCartByIdUser(req, res);
});

app.get("/cart/get-length/:idUser", checkUserExistWithGet, (req, res) => {
    cartController.getLengthCartByIdUser(req, res);
});

app.delete("/category/delete/:id", checkUserExistWithGet, (req, res) => {
    categoryController.deleteCategory(req, res);
});

app.delete("/cart/delete/:idCart", checkUserExistWithGet, (req, res) =>{
    cartController.deleteCartById(req, res);
});

app.delete("/product/delete/:id", checkUserExistWithGet, (req, res) => {
    productController.deleteProduct(req, res);
})

app.patch("/category/update/:id", checkUserExist, (req, res) => {
    categoryController.updateCategory(req, res);
});

app.patch("/cart/update/quantity", checkUserExist, (req, res) => {
    cartController.updateQuantityProduct(req, res);
})

app.patch("/product/update/:id",upload.single('fileProduct'), checkUserExist, (req, res) => {
    productController.updateProduct(req, res);
})

app.patch("/auth/verify/:token", (req, res) => {
    authenticationController.verifyEmail(req, res);
});

export default app;
