import { MainCard } from "../Components/MainCard";
import { Link, useOutletContext, Navigate, useParams } from "react-router-dom";
import TitlePage from "../Components/TitlePage";
import { AlertError } from "../Components/AlertMessage";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading  from "../Components/Loading";
import { DangerAlert, SuccessAlert } from "../Components/Alert";

const AddCategory = () => {
    const [isErrMsgHidden, setIsErrMsgHidden] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [isProccesSubmit, setProccessSubmit] = useState(false);
    const [idCategory, setIdCategory] = useState(null);
    const [category, setCategory] = useState("");
    const context = useOutletContext();
    const {id} = useParams();
    const URI = import.meta.env.VITE_API_URL;
    let localData = localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN)
    localData = JSON.parse(localData);
    let email;
    
    if (localData != undefined){
        email = localData.email
    }

    const sendCategory = () => {
        setProccessSubmit(true);
        const category = document.getElementById('category').value;

        if (category == ""){
            setErrMsg("Category cannot be null!");
            setIsErrMsgHidden(false);
            setProccessSubmit(false);
        } else {
            const data = 
            {
                id_user : localData.id_user,
                email,
                categoryBody: category
            }

            axios.post(URI + "category/add", data)
            .then((res) => {
                const data = res.data;
                

                if(data.status == 200){
                    context.openAlertModal("Sukses Menambahkan Data!", 1);
                }else {
                    context.openAlertModal("Gagal Menambahkan Data!", 0);
                }
            }).catch(() => {
                    context.openAlertModal("Gagal Menambahkan data!", 0);
            })

            setProccessSubmit(false);
        }
    }

    const updateCategory = () => {
        setProccessSubmit(true);
        const category = document.getElementById('category').value;

        if (category == ""){
            setErrMsg("Category cannot be null!");
            setIsErrMsgHidden(false);
            setProccessSubmit(false);
        } else {
            const data = 
            {
                id_user : localData.id_user,
                email,
                idCategory: id,
                category
            }

            axios.patch(`${URI}category/update/${id}`, data)
            .then((res) => {
                console.log(res);
                const data = res.data;

                if(data.status == 200){
                    context.openAlertModal("Sukses update Data!", 1);
                }else {
                    context.openAlertModal("Gagal update data!", 0);
                }
            }).catch(() => {
                    context.openAlertModal("Gagal update data!", 0);
            })

            setProccessSubmit(false);
        }
    }

    useEffect(() => {
        if (id != undefined){
            const data = {
                idCategory : id,
                email
            };

            axios.get(`${URI}category/get/one`, {params: data})
            .then((res) => {
                const data = res.data;
                if (data.status == 200){
                    setCategory(data.category);
                } else {    
                    context.openAlertModal("Terjadi masalah, silahkan coba lagi!", 0);
                }
            }).catch((err) => {
                context.openAlertModal("Terjadi masalah, silahkan coba lagi!", 0);
            })
        }
    }, [])

    const saveData = () => {
        if (id == undefined){
            // add data
            sendCategory();
        } else {
            // edit Data
            updateCategory();
        }
    }

    const titlePage = id == undefined ? "Add Category" : "Edit Category";
    
    return (
        <>
            <TitlePage title={titlePage}/>
            <MainCard>  
                <form action="">
                    <div className="mb-3">
                        <div className="flex flex-col sm:flex-row sm:item-center sm:gap-4 gap-2 font-montserrat mt-3">
                            <div className="w-32">
                                <label htmlFor="category">Category</label>
                            </div>
                            <div className="flex flex-col w-full gap-4">
                                <input type="text" name="categroy" id="category" className="w-full py-2 px-3 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary" defaultValue={category}/>
                                <AlertError msg={errMsg} isHidden={isErrMsgHidden}/>
                                
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center">
                        <Link to={'/category'}>
                            <button className="bg-gray-300 mr-2 p-2 rounded-md" type="button">
                                Kembali
                            </button>
                        </Link>
                        <button className="bg-blue-500 text-white p-2 rounded-md" type="button" onClick={saveData   }>
                            {isProccesSubmit == false ? "Submit" : <Loading classLoading={"w-7 h-7"}/>}
                        </button>
                    </div>
                </form>
            </MainCard>
            
        </>
    )
}

export default AddCategory;