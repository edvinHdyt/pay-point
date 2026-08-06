import { MainCard } from "../Components/MainCard";
import TitlePage from "../Components/TitlePage";
import { renderToStaticMarkup } from "react-dom/server";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";


const ProductMaster = () => {
    const [tableData, setTableData] = useState([]);
    const URI = import.meta.env.VITE_API_URL;
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
            selector: row => row.name
        },
        {
            name: "Stock",
            selector: row => row.stock
        },
        {
            name: "Price",
            selector: row => row.price
        },
        {
            name: "Action",
            cell: (row) => {
                <div className="flex">
                    <BtnEdit action={{id: row.id}}/>
                    <BtnRemove action={{removeElm, id: row.id}}/>
                </div>
            }
        }
    ]

    useEffect(() => {
        let obj = {
            email
        };

        console.log(email)
        axios.get(`${URI}product/get`, {params: obj})
        .then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }, []);

    return (
        <>
            <TitlePage title={"Product Master"}/>

            <MainCard >
                <div className="flex flex-wrap-reverse gap-2 md:gap-11 justify-between">
                    <div className="flex gap-2">
                        <input type="text" placeholder="Cari Produk" className="w-65 h-9 p-3 border-[0.8px] border-stone-400 rounded-md outline-[0.8px] outline-primary "/>
                        <button type="button" className="w-14 h-9 bg-blue-500 text-white rounded-md shadow-sm active:translate-y-[2px] transition duration-75">Cari</button>
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