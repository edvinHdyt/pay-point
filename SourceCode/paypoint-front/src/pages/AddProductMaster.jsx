import { useState } from "react";
import { MainCard } from "../Components/MainCard";
import TitlePage from "../Components/TitlePage";
import { Link } from "react-router-dom";



const AddProductMaster = () => {
    const [countDesc, setCountDesc] = useState(0);
    const [descErrMsg, setDescErrMsg] = useState();

   const descProduc = () => {
        const inputDescProd = document.getElementById("descProduct");
        const inputVal = inputDescProd.value;

        if(inputVal.length > 100){
            setDescErrMsg("Max description is 100 character");
            inputDescProd.value = inputVal.substr(0, 100);
        } else {
            setCountDesc(inputVal.length);
            setDescErrMsg("");
        }

   }

    const selectImage = () => {
        const inputFile = document.getElementById("productImg");
        const imgProduct = document.getElementById("imgProduct");
        const imgName = document.getElementById("imgName");
        const imgErrMsg = document.getElementById("imgErrMsg");
        inputFile.click();
    
        inputFile.addEventListener('change', () => {
            const [file] = inputFile.files;
            let fileType = file.type;
            fileType = fileType.split("/");

            if (file){
                if (fileType[0] != "Image"){
                    imgErrMsg.innerText = "Valid type of file is PNG | JPG | JPEG!";
                    return;
                }

                const fileUrl = URL.createObjectURL(file);
                imgProduct.src = fileUrl;
                imgName.innerText = file.name;
                

                imgProduct.classList.remove("hidden");
            }
        })
    }


    return (
        <>
            <TitlePage title={'Add Product Master'}/>
            <MainCard>
                <form action="" className="relative">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-5 font-montserrat ">
                        <div className="w-32">
                            <label htmlFor="productName">Product Name</label>
                        </div>
                        <input type="text" name="product-name" id="productName" className="w-full py-2 px-3 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary" placeholder="Product Name"/>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-5 font-montserrat">
                        <div className="w-32">
                            <label htmlFor="stock">Stock</label>
                        </div>
                        <input type="number" name="product-name" id="stock" className="w-full py-2 px-3 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary" placeholder="Stock"/>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-5 font-montserrat">
                        <div className="w-32">
                            <label htmlFor="category">Category</label>
                        </div>
                       <select name="category" id="category" className="w-full py-2 px-4 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary">
                        <option disabled selected>Category</option>
                       </select>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-5 font-montserrat">
                        <div className="w-32">
                            <label htmlFor="price">Price</label>
                        </div>
                        <div className="w-full flex">
                            <div className=" w-12 px-3 py-2 bg-white rounded-md border-[0.8px]  top-0 rounded-r-none border-t-gray-400 border-b-gray-400 border-l-gray-400">Rp</div>
                            <input type="number" name="product-name" id="price" className="w-full py-2 px-3 border-[0.8px] border-t-gray-400 border-r-gray-400 border-b-gray-400 rounded-l-none shadow-sm outline-primary rounded-r-lg " placeholder="Price"/>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-top sm:gap-10 font-montserrat mb-3">
                        <div className="w-32">
                            <label htmlFor="product_desc">Description</label>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <textarea name="" id="descProduct" className="w-full py-2 px-4 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary max-h-32 min-h-10" placeholder="Description" onKeyUp={descProduc}></textarea>
                            <div className="flex items-top justify-between w-full">
                                <span className="text-sm text-red-500 font-montserrat" id="descErrMsg">{descErrMsg}</span>
                                <span className="text-sm text-tersier-text">{countDesc}/100</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-top sm:gap-10 mb-3 font-montserrat ">
                        <div className="w-30">
                            <label htmlFor="productImage">Product Image</label>
                        </div>
                        <div className="flex-flex-col mt">
                            <div className="mb-3 ">
                                <div className="flex gap-3">
                                    <button className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button" id="selectImage" onClick={selectImage}>
                                        Select Image
                                    </button>
                                    <span className="text-sm text-tersier-text font-montserrat mt-2" id="imgName"></span>
                                </div>
                                <span className="text-sm text-red-500 font-montserrat mt-[-1rem]" id="imgErrMsg"></span>
                            </div>
                            <img src="" alt=""  className="hidden w-52 h-52 border-[0.9px] border-gray-500 rounded-md" id="imgProduct"/>
                        </div>
                    </div>
                    <div className="flex justify-end items-end">
                    <button className="bg-blue-500 text-white p-2 rounded-md shadow-sm  active:translate-y-[2px] transition duration-75" type="button">
                        Save
                    </button>
                    </div>
                </form>
            </MainCard>

            <input type="file" name="product_photo" id="productImg" className="w-full py-2 px-4 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary hidden"/>

        </>
    )
}

export default AddProductMaster;
