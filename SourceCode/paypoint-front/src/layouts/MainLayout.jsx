import { Children, useState } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";

const MainLayout = ({children}) => {
    const [isSidebarOpen, setIsSideBarOpen] = useState(false);
    
    const toggleSidebar = () => {
        setIsSideBarOpen(!isSidebarOpen);
    }

    return (
        <>
            <Navbar toggleSidebar={toggleSidebar}/>
            <Sidebar handlerSidebar={{isSidebarOpen, toggleSidebar}}/>
            <main className="">
                {children}
            </main>
            <Footer />
        </>
    )
}


export default MainLayout;