import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';

import {MainCard} from '../Components/MainCard';
import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Link } from 'react-router-dom';
import TitlePage from '../Components/TitlePage';
import { BtnEdit, BtnRemove } from '../Components/Button';



const Category = () => {
    DataTable.use(DT);
    const btnEdit = renderToStaticMarkup(<BtnEdit/>);
    const btnRemove = renderToStaticMarkup(<BtnRemove/>);

    const [tableData] = useState([
        ['1', 'test',btnEdit +' '+ btnRemove],
        ['2', 'lorem', btnEdit +' '+ btnRemove],
    ]);

    return (
        <> 
            <TitlePage title={'Category'}/>

            <MainCard>
                <Link to={'add-category'}>
                    <button className="bg-blue-500 text-white p-2 rounded-md shadow-sm mr-auto flex float-right mb-3 shadow-sm active:translate-y-[2px] transition duration-75">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21"/></svg>
                        Add Category
                    </button>
                </Link>
                <DataTable data={tableData} className='display' options={{
                    scrollX: true,
                    scrollY: '20rem',
                    scrollCollapse: true
                }}>
                    <thead className='bg-primary'>
                        <tr>
                            <th>No</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                </DataTable>
            </MainCard>

        </>
    )
}

export default Category;