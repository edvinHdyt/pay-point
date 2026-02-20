import { MainCard } from "../Components/MainCard";
import TitlePage from "../Components/TitlePage";
import DataTable from "datatables.net-react";
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import { renderToStaticMarkup } from "react-dom/server";
import { BtnEdit, BtnRemove } from "../Components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";


const ProductMaster = () => {
    DataTable.use(DT);
    const btnEdit = renderToStaticMarkup(<BtnEdit/>);
    const btnRemove = renderToStaticMarkup(<BtnRemove/>);

    const [tableData] = useState([
        ['1', 'Americano.jpg', 'Americano', '20', '23000', btnEdit + ' ' + btnRemove],
        ['1', 'Americano.jpg', 'Americano', '20', '23000', btnEdit + ' ' + btnRemove],

    ])

    return (    
        <>
            <TitlePage title={"Product Master"}/>

            <MainCard >
                <Link >
                    <button className="bg-blue-500 text-white p-2 rounded-md shadow-sm flex float-right mb-3 shadow-sm active:translate-y-[2px] transition duration-75">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21"/></svg>
                        Add Product
                    </button>
                </Link>
                <DataTable className="display" data={tableData} options={{
                    scrollX: true,
                    scrollCollapse: true,
                    scrollY: '20rem',
                    paging: true
                }}>
                    <thead className="bg-primary">
                        <tr>
                            <th>No</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </DataTable>
            </MainCard>
        </>
    )
}


export default ProductMaster;