import Category from "../model/Category";
import User from "../model/User";


class CategoryController {
   async addCategory(req, res){
      try {
         const {category, id_user} = req.body;
         const user = await User.findById(id_user);

         const date = new Date((new Date).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta"
         }));


         if (!user){
            throw new Error('User tidak ketemu');
         }

         const category = new Category({
            category: category,
            modified_by: user.name,
            created_at: date
         });

        await category.save();

        return res.status(200).json({msg: "Category berhasil disimpan!"})
         
      } catch (error) {
         let err = error.message != undefined ? error.message : "Internal server error";
         status = error.message != undefined ? 409 : 500;
         return res.status(200).json({msg: err, status})
      }

   }
   async deleteCategory(req, res){
      try {
         const {id_category} = req.body;
         
         await Category.findByIdAndDelete(id_category);
         return res.status(200).json({msg: "Delete berhasil!", status: 200});
      } catch (error) {
         let err = error.message != undefined ? error.message : "Internal server error";
         status = error.message != undefined ? 409 : 500;
         return res.status(200).json({msg: err, status})
      }
   }

   async getCategory(req, res){
      try {
         const category = await Category.find();

         return res.status(200).json(category);
      } catch (error) {
         return res.status(200).json({msg: "Internal server error", status: 500})
      }
   }

   async updateCategory(req, res){
      try {
         const {id_category, category, id_user} = req.body;
         const user = await User.findById(id_user);

         if (!user){
            throw new Error('User tidak ketemu');
         }


         await Category.updateOne(id_category, {category: category, modified_by: user.name});

         return res.status(200).json({msg: "Update berhasil", status: 200});
      } catch (error) {
         let err = error.message != undefined ? error.message : "Internal server error";
         status = error.message != undefined ? 409 : 500;
         return res.status(200).json({msg: err, status})
      }
   }
}

export default CategoryController;