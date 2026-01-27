import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';

import {MainCard} from '../Components/MainCard';
import { useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Link } from 'react-router-dom';
import TitlePage from '../Components/TitlePage';

const ButtonEdit = () => {
    return (
        <button className='bg-primary p-1 px-2 rounded-md mr-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2"><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"/><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"/></g></svg>
        </button>
    )
}

const ButtonRemove = () => {
    return (
        <button className='bg-red-500 p-1 px-2 rounded-md mr-2 text-white'>
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg>
        </button>
    )
}

const Category = () => {
    DataTable.use(DT);
    const btnEdit = renderToStaticMarkup(<ButtonEdit/>);
    const btnRemove = renderToStaticMarkup(<ButtonRemove/>);

    const [tableData] = useState([
        ['1', 'test', [btnEdit, btnRemove]],
        ['2', 'lorem', [btnEdit, btnRemove]],
    ]);

    return (
        <> 
            <TitlePage title={'Category'}/>

            <MainCard>
                <Link to={'add-category'}>
                    <button className="bg-blue-500 text-white p-2 rounded-md shadow-sm mr-auto flex float-right mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21"/></svg>
                        Add Category
                    </button>
                </Link>
                <DataTable data={tableData} className='display'>
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