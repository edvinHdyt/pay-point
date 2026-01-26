import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';

import {MainCard} from '../Components/MainCard';
import { useState } from 'react';

const Category = () => {
    DataTable.use(DT);
    const [tableData, setTableData] = useState([
        ['1', 'test', '<button style="background-color:blue;">test</button>']
    ])

    return (
        <> 
            <h1 className="text-2xl text-tersier-text font-bold">
                Category
            </h1>

            <MainCard>
                <DataTable data={tableData} className='display'>
                    <thead>
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