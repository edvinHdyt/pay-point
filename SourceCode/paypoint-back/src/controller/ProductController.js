import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import {Product} from '../model/Product.js';
import User from '../model/User.js';
import { Category } from '../model/Category.js';
import {v2 as cloudinary} from 'cloudinary';
import Price from '../model/Price.js';

class ProductController{
    async addProduct(req, res){
        try {
            if (req.file){
                const {id_user, productName, stock, category_id, price, desc} = req.body;
                const user = await User.findById(id_user);
                
                const date = new Date((new Date).toLocaleString("en-US", {
                    timeZone: "Asia/Jakarta"
                }));

                if (!user){
                    throw new Error('User tidak ketemu');
                }

                const result =  await this.uploadImgToCloudinary(req);
                const newFileName = result.display_name + '.' + result.format;

                const category = await Category.findById(category_id);

                const priceRangeId = await this.checkPriceRange(price);

                const product = new Product({
                    product_name: productName,
                    price,
                    stock,
                    desc_product: desc,
                    image: {
                        image_id: result.public_id,
                        image_url: result.secure_url,
                        image_name: newFileName
                    },
                    created_at: date,
                    modified_by: user.name,
                    category: {
                        _id: category._id, 
                        category: category.category
                    },
                    price_range_id: priceRangeId
                });

                await product.save();

                return res.status(200).json({msg: "Produk berhasil disimpan!", status: 200});
            } else {
                throw new Error("Gagal menyimpan produk");
            }
        } catch (error) {
            return res.status(200).json({'msg': error.message, status: 500});
        }
       
    }

    async addPriceRange(){
        try {
            const date = new Date((new Date).toLocaleString("en-US", {
                timeZone: "Asia/Jakarta"
            }));
            const price = await Price.find();
            
            if(price.length == 0){
                const arrPrice = [
                    [ 1000,25000],
                    [25001, 50000],
                    [50001, 100000],
                    [100001, 200000],
                    [200001, 0]
                ];

                for (let i = 0; i < arrPrice.length; i++) {
                    let priceModel = new Price();
                    priceModel.price_start = arrPrice[i][0];
                    priceModel.price_end = arrPrice[i][1];
                    priceModel.created_at = date;
                    priceModel.modified_by = "ADMIN";

                    await priceModel.save();   
                }
            }

        } catch (err) {
            throw new Error(err);
        }
    }

    async checkPriceRange(productPrice){
        try {
            const price = await Price.find();
            let priceRangeId = undefined;
        
            price.forEach(elm => {
                if (productPrice > 200000){
                    priceRangeId = elm._id;
                }else {
                    if(productPrice >= elm.price_start && productPrice <= elm.price_end){
                        priceRangeId = elm._id;
                    }
                }
            });

            return priceRangeId;
        } catch (error) {
            throw new Error(error);
        }
        
    }

    async deleteProduct(req, res){
        try {
            const {id} = req.params;
            await Product.findByIdAndDelete(id)

            return res.status(200).json({"msg": "Sukses menghapus data", status: 200});
        } catch (error) {
            return res.status(200).json({"msg": "Gagal menghapus data", status: 500});  
        }
    }

    async getPriceRange(req, res){
        try {
            const price = await Price.find();

            

            const priceRange = price.map((price) => {

                let obj = {
                    _id: price._id,
                    price_start: price.price_start,
                    price_end: price.price_end,
                }
                return obj;
            });

            return res.status(200).json({"data": priceRange, status: 200});s

        } catch (err) {
            return res.status(200).json({"msg": "Gagal mengambil price data", status: 500});
        }
    }

    async getProduct(req, res){
        try {
            this.addPriceRange();

            const prod = await Product.find();
            const finalProduct = this.finalProduct(prod)

            return res.status(200).json({"product": finalProduct, "status": 200});
        } catch (error) {
            return res.status(200).json({"msg": error.message, "status": 500});
        }
    }

    async getOneProduct(req, res){
        try{
            const id = req.query.id;

            let product = await Product.findById(id);
           
            product = {
                "id": product._id,
                "product_name": product.product_name,
                "image": product.image,
                "price": product.price,
                "stock": product.stock,
                "desc": product.desc_product,
                "id_category": product.category._id,
                "price_range_id": product.price_range_id
            }
            
            return res.status(200).json({product, status: 200});
        }catch(err){
        }
    }

    finalProduct(product){
         const finalProduct = product.map((product) => {
            const obj = {
                "id": product._id,
                "product_name": product.product_name,
                "price": product.price,
                "stock": product.stock,
                "image": {
                "image_url": product.image.image_url,
                "image_name": product.image.image_name  
                },
                "category": product.category,
                "price_range_id": product.price_range_id
            }

            return obj;
        });

        return finalProduct;
    }

    async getProductByCategory(req, res){
        try {
            const idCategory = req.params.id;

            let product = await Product.find({'category._id': idCategory});
            const finalProducts = this.finalProduct(product);

            return res.status(200).json({"product": finalProducts, "status": 200});
        } catch (err) {
            return res.status(200).json({msg: err.message, status: 500});
        }
    }

    

    async getProductByPriceRange(req, res){
        try {
            const priceId = req.params.id;

            let product = await Product.find({price_range_id: priceId});
            const finalProducts = this.finalProduct(product);
            return res.status(200).json({"product": finalProducts, "status": 200});
        } catch (err) {
            console.log(err)
            return res.status(200).json({msg: err.message, status: 500});
        }
    }

    

    async updateProduct(req, res){
        try{
            const {
                id_user,
                productName,
                stock,
                category_id,
                price, 
                desc,
                id_product,
                id_image
            } = req.body;

            const user = await User.findById(id_user);
            const date = new Date((new Date).toLocaleString("en-US", {
                timeZone: "Asia/Jakarta"
            }));
            
            if (user == undefined){
                throw new Error("User not found");
            }

            const category = await Category.findById(category_id);
            
            if (category == undefined){
                throw new error("Category not found");
            }

            const product = await Product.findById(id_product);
            if (product == undefined){
                throw new Error("Product not found");
            }
            

            let obj;
            if (product.image.image_id != id_image){
                const result =  await this.uploadImgToCloudinary(req);
                const newFileName = result.display_name + '.' + result.format;

                obj = {
                    product_name: productName,
                    price,
                    stock,
                    desc_product: desc,
                    image: {
                        image_id: result.public_id,
                        image_url: result.secure_url,
                        image_name: newFileName
                    },
                    created_at: date,
                    modified_by: user.name,
                    category: {
                        _id: category._id, 
                        category: category.category
                    }
                }
            } else {
                obj = {
                    product_name: productName,
                    price,
                    stock,
                    desc_product: desc,
                    created_at: date,
                    modified_by: user.name,
                    category: {
                        _id: category._id, 
                        category: category.category
                    }
                }
            }

            await Product.updateOne({_id: id_product}, {$set: obj});

            return res.status(200).json({msg: "Berhasil update product", status: 200})
        }catch(error){
            return res.status(200).json({msg: "Berhasil update product", status: 500})
        }
    }

    async uploadImgToCloudinary(req){
        let result;
        try {
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET, 
                secure: true
            });
    
            // upload image to cluoduinary
            const cloudOptions = {
                use_filename: true,
                unique_filename: false,
                overwrite: true
            }
            
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
            result = await cloudinary.uploader.upload(dataURI, cloudOptions)
            
        } catch (error) {
            result = undefined;
            throw new Error(error);
        }

        return result;
    }
}

export default ProductController;