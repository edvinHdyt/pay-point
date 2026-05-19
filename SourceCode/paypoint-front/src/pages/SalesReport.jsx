import TitlePage from "../Components/TitlePage";
import { MainCard } from "../Components/MainCard";
import DataTable from "datatables.net-react";
import DT from 'datatables.net-dt';
import 'datatables.net-responsive-dt';
import { useState } from "react";
import { Link } from "react-router-dom";


const SalesReport = () => {
    DataTable.use(DT);
    // const [salesData] = useState([

    // ])

    return (
        <>
            <TitlePage title="Sales Report"></TitlePage>
            <MainCard>
                <div className="flex gap-2 flex-col sm:flex-row flex-wrap w-full justify-end">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="startDate" className="block sm:hidden text-sm text-tersier-text">Start Date</label>
                        <input type="date" name="startDate" id="startDate"  className="px-2 h-10 rounded-md  border-[0.8px] border-gray-300"/>
                    </div>
                    <p className="mt-2 hidden sm:block">-</p>
                     <div className="flex flex-col gap-2">
                        <label htmlFor="endDate" className="block sm:hidden text-sm text-tersier-text">End Date</label>
                        <input type="date" name="endDate" id="endDate"  className="px-2 h-10 rounded-md  border-[0.8px] border-gray-300"/>
                    </div>

                  <Link >
                    <button className="bg-red-500 text-white p-2 rounded-md shadow-sm flex mb-3 active:translate-y-[2px] transition duration-75 justify-center items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z" />
                        </svg>

                        Download Report
                    </button>
                </Link>
                </div>

                <DataTable clasname="display"  options={{
                    scrollX: true,
                    scrollColapse: true,
                    scrollY:true,
                    paging: true
                }}>
                    <thead className="bg-primary">
                        <tr>
                            <th>No</th>
                            <th>Customer Name</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Payment Type</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>

                </DataTable>
            </MainCard>
        </>
    )
}

export default SalesReport;