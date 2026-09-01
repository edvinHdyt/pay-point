import { MainCard } from "../Components/MainCard";
import TitlePage from "../Components/TitlePage";
import { renderToStaticMarkup } from "react-dom/server";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { BtnEdit, BtnRemove } from "../Components/Button";


const ProductMaster = () => {
    const [productData, setProductData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const URI = import.meta.env.VITE_API_URL;
    const context = useOutletContext();
    let localData = localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN)
    localData = JSON.parse(localData);
    let email;
    
    if (localData != undefined){
        email = localData.email
    }

    const customStyle = {
        table: {
            style:{
                border: '1px solid #eeee'
            }
        },
        headRow: {
            style: {
                backgroundColor: '#FBBF24',
                fontWeight: 700,
                fontSize: '14.5px',
                borderBottom: '1px solid #e5e7eb'
            },
            cells: {
                style: {
                    border: '0.8px solid #9999'
                }
            }
        },
        rows: {
            style: {
                fontSize: '14px',
            },
            selectedHighlightStyle: {
                backgroundColor: '#e0eaff',
            },
        },
        cells: {
            style: {
                border: '0.8px solid #eeee'
            },
        },
    }

    const columns = [
        {
            name: "No",
            selector: row => row.idx,
            sortable: true
        }, 
        {
            name: "Name",
            selector: row => row.product.product_name
        },
        {
            name: "Stock",
            selector: row => row.product.stock
        },
        {
            name: "Price",
            selector: row => row.product.price
        },
        {
            name: "Category",
            cell: (row) => (
                <div className="flex w-60 h-auto items-center justify-center align-middle bg-primary p-2 rounded-lg  ">
                    <p>{row.product.category.category}</p>
                </div>
            )
        },
       {
            name: "Action",
            cell: (row) => (
                <div className="flex">
                    <BtnEdit action={{id: row.product.id, "page": "edit"}}/>
                    <BtnRemove action={{removeElm, id: row.product.id}}/>
                </div>
            )
        }
    ]

    let deletedId = 0;
    const removeElm = (id) => {
        deletedId = id;

        context.openModalConfDelete("Apakah anda yakin ingin menghapus 1 produk?", removeElmAction);
    }

    const removeElmAction = () => {
        if (deletedId != 0){
            let obj = {
                email
            }
            axios.delete(`${URI}product/delete/${deletedId}`, {params: obj})
            .then((res) => {
                const datas = res.data;
                if (datas.status == 200){
                    const newTableData = productData.filter((data) => {
                        return data.product.id != deletedId;
                    });
    
                    let j = 0;
                    for (let i = 0; i < newTableData.length; i++) {
                        j++;
                        newTableData[i].idx = j;
                    }
                    setProductData(newTableData);
                    setTableData(newTableData)
                    context.openAlertModal("Sukses menghapus data!", 1)
                } else {
                    throw new Error("Gagal Menghapus data")
                }
            }).catch((err) => {
                context.openAlertModal("Gagal menghapus data!", 0)
            })
        } else {
            context.openAlertModal("Gagal menghapus data!", 0)
        }
    }

    useEffect(() => {
        let obj = {
            email
        };

        axios.get(`${URI}product/get`, {params: obj})
        .then((res)=>{
            const datas = res.data;
            if (datas.status == 200){
                let obj = [];
                let i = 0;
                datas.product.forEach(elm => {
                    i++;
                    obj.push(
                        {idx: i, product: elm}
                    )
                });
                setProductData(obj);
                setTableData(obj);
            } else {
                throw new Error(res.msg);
            }
        }).catch((err)=>{
            context.openAlertModal("Gagal Mengambil Data!", 0);
        })
    }, []);

    const searchProductName = () =>{
        const inputSearch = document.getElementById("searchProduct").value;
        
        if (inputSearch.trim().length != 0){
            let productFilter = productData.filter((data) => {
                return data.product.product_name.includes(inputSearch);
            })

            setTableData(productFilter);
        } else {
            setTableData(productData)
        }
    }

    return (
        <>
            <TitlePage title={"Product Master"}/>

            <MainCard >
                <div className="flex flex-wrap-reverse gap-2 md:gap-11 justify-between">
                    <div className="flex gap-2">
                        <input type="text" placeholder="Cari Produk" className="w-65 h-9 p-3 border-[0.8px] border-stone-400 rounded-md outline-[0.8px] outline-primary " onKeyUp={searchProductName} id="searchProduct"/>
                    </div>
                    <div className="flex justify-end align-end">
                        <Link to={'add'}>
                            <button className="bg-blue-500 text-white p-2 rounded-md shadow-sm flex mb-3 active:translate-y-[2px] transition duration-75">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21"/></svg>
                                Add Product
                            </button>
                        </Link>
                    </div>
                </div>

               <DataTable 
               columns={columns} pagination customStyles={customStyle} data={tableData} persistTableHead={true}/>
            </MainCard>
        </>
    )
}


export default ProductMaster;