import { Chart as ChartJs } from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import {MainCard, MainCardHalf} from "../Components/MainCard";

const Dashboard = () => {
    return (
        <div className="font-montserrat">
            <h1 className="text-2xl font-bold text-tersier-text mb-2">Dashboard</h1>
            <MainCard>
                <div className="flex justify-center item-center">
                    <div className="w-full flex flex-col justify-center">
                        <h1 className="text-[1.3rem] text-primary-text font-montserrat font-bold">Hallo, John Doe</h1>
                        <p className="text-secondary-text">Ready to start a good day?</p>
                    </div>
                    <img src="../src/assets/Img/undraw_welcoming_42an.svg" alt="Welcome Illustrator" className="w-60 h-60"/>
                </div>
            </MainCard>
            <section className="flex lg:flex-row flex-col gap-3">
                <MainCardHalf>
                    <div className="flex flex-col w-full">
                        <h1 className="text-[1.2rem] font-montserrat font-bold underline text-primary-text">Pendapatan Perbulan</h1>
                        <Line data={{
                            labels: "test",
                            datasets: [
                                {
                                    label: "Revenue", 
                                    data: [200, 300, 100, 300]
                                }
                            ]

                        }}/>
                    </div>
                </MainCardHalf>
                <MainCardHalf>
                    <div className="flex flex-col w-full">
                        <h1 className="text-[1.2rem] font-montserrat font-bold underline text-primary-text">Stock Barang</h1>

                        <Bar data={{
                            labels: "test",
                            datasets: [
                                {
                                    label: "Revenue", 
                                    data: [200, 300, 100, 300]
                                }
                            ]

                        }}/>
                    </div>
                </MainCardHalf>
            </section>
        </div>
    )
}

export default Dashboard;