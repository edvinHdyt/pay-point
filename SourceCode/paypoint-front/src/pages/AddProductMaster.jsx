import { useEffect, useState } from "react";
import { MainCard } from "../Components/MainCard";
import TitlePage from "../Components/TitlePage";
import { Link, useOutlet, useOutletContext } from "react-router-dom";
import axios from "axios";
import { BtnEdit } from "../Components/Button";
import { AlertError, AlertInptErrors } from "../Components/AlertMessage";
import Loading from "../Components/Loading";
const AddProductMaster = () => {
    const [countDesc, setCountDesc] = useState(0);
    const [descErrMsg, setDescErrMsg] = useState();
    const [email, setEmail] = useState();
    const [categories, setCategoires]  = useState([]);
    const [isProccesSubmit, setProccessSubmit] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const URI = import.meta.env.VITE_API_URL;
    let localData = localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN);
    localData = JSON.parse(localData);
    const context = useOutletContext();
    if(email == undefined){
        if(localData.length != 0){
            setEmail(localData.email);
        }
    }

    let idUser;
    if(localData.length != 0){
        idUser = localData.id_user;
    }

    const [arrErrMsg, setArrErrMsg] = useState(
        [
            {
                "isHidden": true,
                "msg": ""
            },
            {
                "isHidden": true,
                "msg": ""
            },
            {
                "isHidden": true,
                "msg": ""
            },
            {
                "isHidden": true,
                "msg": ""
            },
            {
                "isHidden": true,
                "msg": ""
            },
            {
                "isHidden": true,
                "msg": ""
            },
        ]
    );

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
                if (fileType[0].toLowerCase() != "image"){
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

    useEffect(() => {
        let data = {
            email
        }

        axios.get(`${URI}category/get`, {params: data})
        .then((res) => {
            if(res.data.status == 200){
                const datas = res.data.categories;
                let catDatas = [];

                datas.forEach(elm => {
                    catDatas.push(elm);
                });
    
                setCategoires(catDatas);
            } else {
                throw new Error("Terjadi Kesalahan");
            }
        }).catch((err) => {
            console.log(err)
        })

        for (let i = 0; i < categories.length; i++) {
            const element = array[i];
            
        }
    }, []);

    const validateForm = () => {
        const productName = document.getElementById("productName").value;
        const stock = document.getElementById("stock").value;
        const category = document.getElementById("category").value;
        const price = document.getElementById("price").value;
        const desc = document.getElementById("descProduct").value;
        const imgProduct = document.getElementById('imgProduct').src;
        const inptValLen = [productName.length,stock.length,category.length,price.length,desc.length, imgProduct.length];

        let msg =  [
            {
                "isHidden": true,
                "msg": ""
            },
            {
                "isHidden": true,
                "msg": ""
            },
            {
                "isHidden": true,
                "msg": ""
            },
            {
                "isHidden": true,
                "msg": ""
            },
            {
                "isHidden": true,
                "msg": ""
            },
            {
                "isHidden": true,
                "msg": ""
            },
        ]

        let isError = false;

        for (let i = 0; i < inptValLen.length; i++) {
            if (inptValLen[i] == 0){
                switch (i) {
                    case 0:
                        msg[i].isHidden = false;
                        msg[i].msg = "Nama produk harus diisi!";
                        break;
                    case 1:
                        msg[i].isHidden = false;
                        msg[i].msg = "Stock produk harus diisi!";
                        break;
                    case 2:
                        msg[i].isHidden = false;
                        msg[i].msg = "Category harus dipilih!";
                        break;
                    case 3:
                        msg[i].isHidden = false;
                        msg[i].msg = "Harga produk harus diisi!";
                        break;
                    case 4:
                        msg[i].isHidden = false;
                        msg[i].msg = "Deskripsi produk harus diisi!";
                        break;
                    case 5:
                        msg[i].isHidden = false;
                        msg[i].msg = "Foto produk harus diisi!";
                        break;
                }

                isError = true;
            }
        }

        if(category.toLowerCase() == "default"){
            msg[2].isHidden = false;
            msg[2].msg = "Category harus dipilih!";
        }

        setArrErrMsg(msg);

        return isError;
    }
    
    const addProduct = () => {
        setProccessSubmit(true);
        const productName = document.getElementById("productName").value;
        const stock = document.getElementById("stock").value;
        const category_id = document.getElementById("category").value;
        const price = document.getElementById("price").value;
        const desc = document.getElementById("descProduct").value;
        const imgProduct = document.getElementById('imgProduct');
        const inputFile = document.getElementById("productImg");
       
        const isError = validateForm();

        if (!isError){
            const formData = new FormData();
            formData.append("email", email)
            formData.append("productName", productName)
            formData.append("stock", stock)
            formData.append("category_id", category_id)
            formData.append("price", price)
            formData.append("desc", desc)
            formData.append("id_user", idUser)
            formData.append("fileProduct", inputFile.files[0])

            
            axios.post(`${URI}product/add`, formData)
            .then((res) => {
                if (res.status == 200){
                    context.openAlertModal("Sukses menambahkan data!", 1);
                } else {
                    throw new Error();
                }
            }).catch((err) => {
                context.openAlertModal("Gagal Menambahkan data!", 0)
            });

            setProccessSubmit(false);
        } else {
            setProccessSubmit(false);
        }
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
                        <div className="flex flex-col w-full gap-5">
                            <input type="text" name="product-name" id="productName" className="w-full py-2 px-3 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary" placeholder="Product Name"/>
                           <span className={`${arrErrMsg[0].isHidden == true ? 'hidden' : 'block'} text-sm text-red-500 font-montserrat mt-[-1rem]`}>{arrErrMsg[0].msg}</span>
                        </div>
                        
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-5 font-montserrat">
                        <div className="w-32">
                            <label htmlFor="stock">Stock</label>
                        </div>
                        <div className="flex flex-col w-full gap-5">
                            <input type="number" name="product-name" id="stock" className="w-full py-2 px-3 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary" placeholder="Stock"/>

                           <span className={`${arrErrMsg[1].isHidden == true ? 'hidden' : 'block'} text-sm text-red-500 font-montserrat mt-[-1rem]`}>{arrErrMsg[1].msg}</span>
                        </div>
                        
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-5 font-montserrat">
                        <div className="w-32">
                            <label htmlFor="category">Category</label>
                        </div>
                        <div className="flex flex-col w-full gap-5">
                            <div className="flex relative">
                                <select name="category" id="category" className="w-full py-2 px-4 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary appearance-none" defaultValue={"DEFAULT"}>
                                    <option disabled value={"DEFAULT"}>Category</option>
                                    {categories.map(category => (
                                        <option key={category._id} value={category._id}>{category.category}</option>
                                    ))}
                                </select>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24" className="absolute right-3 pointer-events-none top-2">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z" />
                                </svg>
                            </div>
                           <span className={`${arrErrMsg[2].isHidden == true ? 'hidden' : 'block'} text-sm text-red-500 font-montserrat mt-[-1rem]`}>{arrErrMsg[2].msg}</span>
                        </div>
                     

                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-10 mb-5 font-montserrat">
                        <div className="w-32">
                            <label htmlFor="price">Price</label>
                        </div>
                         <div className="flex flex-col w-full gap-5">
                            <div className="w-full flex">
                                <div className=" w-12 px-3 py-2 bg-white rounded-md border-[0.8px]  top-0 rounded-r-none border-t-gray-400 border-b-gray-400 border-l-gray-400">Rp</div>
                                <input type="number" name="product-name" id="price" className="w-full py-2 px-3 border-[0.8px] border-t-gray-400 border-r-gray-400 border-b-gray-400 rounded-l-none shadow-sm outline-primary rounded-r-lg " placeholder="Price"/>
                            </div>

                           <span className={`${arrErrMsg[3].isHidden == true ? 'hidden' : 'block'} text-sm text-red-500 font-montserrat mt-[-1rem]`}>{arrErrMsg[3].msg}</span>
                        </div>
                        
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-top sm:gap-10 font-montserrat mb-3">
                        <div className="w-32">
                            <label htmlFor="product_desc">Description</label>
                        </div>
                            <div className="flex flex-col w-full">
                                <textarea name="" id="descProduct" className="w-full py-2 px-4 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary max-h-32 min-h-10" placeholder="Description" onKeyUp={descProduc}></textarea>
                                <div className="flex">
                                    <span className={`${arrErrMsg[4].isHidden == true ? 'hidden' : 'block'} text-sm text-red-500 font-montserrat mt-[0.4rem] w-full`}>{arrErrMsg[4].msg}</span>
                                    <div className="flex items-top justify-between w-full">
                                        <span className="text-sm text-red-500 font-montserrat" id="descErrMsg">{descErrMsg}</span>
                                        <span className="text-sm text-tersier-text">{countDesc}/100</span>
                                    </div>
                                </div>
                            </div>                       
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-top sm:gap-10 mb-3 font-montserrat ">
                        <div className="w-30">
                            <label htmlFor="productImage">Product Image</label>
                        </div>
                        

                        <div className="flex-flex-col">
                                <div className="mb-3 ">
                                    <div className="flex gap-3">
                                        <div className="flex flex-col w-full gap-5">
                                            <button className="flex bg-blue-500 text-white rounded-md p-2 items-center justify-center shadow-sm active:translate-y-[2px] transition duration-75" type="button" id="selectImage" onClick={selectImage}>
                                                Select Image
                                            </button>
                                            <span className={`${arrErrMsg[5].isHidden == true ? 'hidden' : 'block'} text-sm text-red-500 font-montserrat mt-[-1rem]`}>{arrErrMsg[5].msg}</span>
                                        </div>
                                        <span className="text-sm text-tersier-text font-montserrat mt-2" id="imgName"></span>
                                    </div>
                                    <span className="text-sm text-red-500 font-montserrat mt-[-1rem]" id="imgErrMsg"></span>
                                </div>
                                <img className="hidden w-52 h-52 border-[0.9px] border-gray-500 rounded-md" id="imgProduct"/>
                            </div>

                      
                    </div>
                   <div className="flex justify-end items-center">
                        <Link to={'/product-master'}>
                            <button className="bg-gray-300 mr-2 p-2 rounded-md" type="button">
                                Kembali
                            </button>
                        </Link>
                        <button className="bg-blue-500 text-white p-2 rounded-md" type="button" onClick={addProduct}>
                            {isProccesSubmit == false ? "Submit" : <Loading classLoading={"w-7 h-7"}/>}
                        </button>
                    </div>
                </form>
            </MainCard>

            <input type="file" name="product_photo" id="productImg" className="w-full py-2 px-4 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary hidden"/>

        </>
    )
}

export default AddProductMaster;
