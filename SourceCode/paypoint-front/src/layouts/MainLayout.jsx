import { Children } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";

const MainLayout = ({children}) => {
    return (
        <>
            <Navbar />
            <main className="">
                {children}
            </main>
            <Footer />
        </>
    )
}


export default MainLayout;