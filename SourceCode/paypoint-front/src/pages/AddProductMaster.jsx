import { MainCard } from "../Components/MainCard";
import TitlePage from "../Components/TitlePage";
import { Link } from "react-router-dom";


const AddProductMaster = () => {
    return (
        <>
            <TitlePage title={'Add Product Master'}/>
            <MainCard>
                <form action="" className="relative">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-3 font-montserrat ">
                        <div className="w-32">
                            <label htmlFor="productName">Product Name</label>
                        </div>
                        <input type="text" name="product-name" id="productName" className="w-full py-2 px-3 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary" placeholder="Product Name"/>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-3 font-montserrat">
                        <div className="w-32">
                            <label htmlFor="stock">Stock</label>
                        </div>
                        <input type="number" name="product-name" id="stock" className="w-full py-2 px-3 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary" placeholder="Stock"/>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-3 font-montserrat">
                        <div className="w-32">
                            <label htmlFor="category">Category</label>
                        </div>
                       <select name="category" id="category" className="w-full py-2 px-4 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary">
                        <option disabled selected>Category</option>
                       </select>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-3 font-montserrat">
                        <div className="w-32">
                            <label htmlFor="price">Price</label>
                        </div>
                        <div className="w-full flex">
                            <div className=" w-12 px-3 py-2 bg-white rounded-md border-[0.8px]  top-0 rounded-r-none border-t-gray-400 border-b-gray-400 border-l-gray-400">Rp</div>
                            <input type="number" name="product-name" id="price" className="w-full py-2 px-3 border-[0.8px] border-t-gray-400 border-r-gray-400 border-b-gray-400 rounded-l-none shadow-sm outline-primary rounded-r-lg " placeholder="Price"/>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-top sm:gap-10 mb-3 font-montserrat">
                        <div className="w-32">
                            <label htmlFor="product_desc">Description</label>
                        </div>
                        <div className="flex flex-col gap-2 w-full items-end">
                            <textarea name="" id="" className="w-full py-2 px-4 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary max-h-32 min-h-10" placeholder="Description"></textarea>
                            <span className="text-sm text-tersier-text ">0/100</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-3 font-montserrat">
                        <div className="w-30">
                            <label htmlFor="productImage">Product Image</label>
                        </div>
                        <div className="flex-flex-col">
                            <button className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button">
                                Select Image
                            </button>
                            <img src="" alt=""  className="hidden"/>
                        </div>
                    </div>
                    <div className="flex justify-end items-end">
                    <button className="bg-blue-500 text-white p-2 rounded-md shadow-sm  active:translate-y-[2px] transition duration-75" type="button">
                        Save
                    </button>
                    </div>
                </form>
            </MainCard>

            <input type="file" name="" id="" className="w-full py-2 px-4 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary hidden"/>

        </>
    )
}

export default AddProductMaster;
