import fs from 'fs';
import path from 'path';
import Product from '../model/Product.js';
import User from '../model/User.js';

class ProductController{
    async addProduct(req, res){
        try {
            let newFileName = null;

            if (req.file){
                newFileName = Date.now() + '-' + req.file.originalname;
                const {id_user, productName, stock, category_id, price, desc} = req.body;
                const user = await User.findById(id_user);
                
                const date = new Date((new Date).toLocaleString("en-US", {
                    timeZone: "Asia/Jakarta"
                }));

                if (!user){
                    throw new Error('User tidak ketemu');
                }

                const product = new Product({
                    product_name: productName,
                    product_image: newFileName,
                    price,
                    stock,
                    desc_product: desc,
                    created_at: date,
                    modified_by: user.name,
                    id_category: category_id
                })
                
                await product.save();

                const savePath = "D:/Web-Devel/Project/PayPoint/SourceCode/assets/FileUpload/";
                const finalPath = path.join(savePath, newFileName);

                fs.writeFileSync(finalPath, req.file.buffer);

                return res.status(200).json({msg: "Produk berhasil disimpan!", status: 200});
            } else {
                throw new Error("Gagal menyimpan produk");
            }
        } catch (error) {
            return res.status(200).json({msg: error.message, status: 500});
        }
       
    }

    async getProduct(req, res){
        try {
            const prod = await Product.find();
            const finalProduct = prod.map(()=>{
                
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export default ProductController;