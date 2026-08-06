import DataTable from 'react-data-table-component';

import {MainCard} from '../Components/MainCard';
import { useEffect, useState } from 'react';
import { Link,  useOutletContext, Navigate, useNavigate } from 'react-router-dom';
import TitlePage from '../Components/TitlePage';
import { BtnEdit, BtnRemove } from '../Components/Button';
import axios from 'axios';



const Category = () => {
    const [tableData, setTabelData] = useState([]);
    const [email, setEmail] = useState();
    const context = useOutletContext();
    const URI = import.meta.env.VITE_API_URL;
    let navigate = useNavigate();

    if (email == undefined){
        let localData = localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN)
        localData = JSON.parse(localData);

        if (localData.length != 0){
            setEmail(localData.email);
        }
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
            name: "Category",
            selector: row => row.category
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex">
                    <BtnEdit action={{id: row.id}}/>
                    <BtnRemove action={{removeElm, id: row.id}}/>
                </div>
            )
        }
    ]

    let deletedIdCat = 0;

    function removeElm(id){
        deletedIdCat = id;
        context.openModalConfDelete("Apakah anda yakin ingin menghapus 1 category?", removeElmAction);
    }

    const removeElmAction = () => {
        if (deletedIdCat != 0){

            let data = {
                email
            }

            axios.delete(`${URI}category/delete/${deletedIdCat}`, {params: data})
            .then(() => {
                const newTableData = tableData.filter((data) => {
                    return data.id != deletedIdCat;
                })

                let j = 0;
                for (let i = 0; i < newTableData.length; i++) {
                    j++;
                    newTableData[i].idx = j;
                }

                setTabelData(newTableData)
                context.openAlertModal("Sukses menghapus data!", 1)
            }).catch(() => {
                context.openAlertModal("Gagal menghapus data!", 0)
            })
        } else {
            context.openAlertModal("Gagal menghapus data!", 0)
        }
    }
    
    
    useEffect(() => {
        const URI = import.meta.env.VITE_API_URL;
        let email;
        if (email == undefined){
            let localData = localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN)
            localData = JSON.parse(localData);

            if (localData.length != 0){
                email = localData.email;
            }
        }
        const data = 
        {
            email: email
        }

        axios.get(URI + "category/get", {params: data})
        .then((res) => {
            const data = res.data;

            if (data.status == 200){
                let dataCategory = [];
                data.categories.forEach((elm, i) => {
                    i++
                    dataCategory.push(
                        {
                            idx: i,
                            id: elm._id,
                            category: elm.category
                        }
                    )

                });
                setTabelData(dataCategory);
            }
        }).catch(()=>{
            
        })
    }, [])

    return (
        <> 
            <TitlePage title={'Category'}/>

            <MainCard>
                <Link to={'add'}>
                    <button className="bg-blue-500 text-white p-2 rounded-md mr-auto flex float-right mb-3 shadow-sm active:translate-y-[2px] transition duration-75">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21"/></svg>
                        Add Category
                    </button>
                </Link>

                <DataTable columns={columns} data={tableData} pagination customStyles={customStyle} persistTableHead={true}/>
            </MainCard>

            

        </>
    )
}

export default Category;