import { useState } from "react";
import { Navigate, Outlet} from "react-router-dom";
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import { ModalCart, ModalAlertMsg, ModalConfEmail,
    ModalChangePass
 } from "../Components/Modals";

const Breadcrumb = () => {
    return (
        <div class="max-w-md">
        <ul class="flex items-center">
            <li class="flex items-center">
            <a href="">
                <svg class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg>
            </a>
            </li>
            <li class="flex items-center overflow-hidden">
            <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd"></path></svg>
            <a href="" class="truncate">First item with a long name</a>
            </li>
            <li class="flex items-center overflow-hidden">
            <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd"></path></svg>
            <a href="" class="truncate">Second item with a long name</a>
            </li>
            <li class="flex items-center overflow-hidden">
            <svg class="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd"></path></svg>
            <a href="" class="truncate">Current page with a long name</a>
            </li>
        </ul>
        </div>
    )
}

const MainLayout = () => {
    const [isSidebarOpen, setIsSideBarOpen] = useState(false);
    const [isRefresh, setIsRefresh] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCartOpen, setIsModalCartOpen] = useState(false);
    const [cartLength, setCartLength] = useState(0);
    const [alertMsg, setAlertMsg] = useState("");
    const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
    const [isModalConfEmaiLOpen, setIsModalConfEmailOpen] = useState(false);
    const [isModalChangePassOpen, setIsModalChangePassOpen] = useState(false);
    
    const handlingCartLength = () => {
        setCartLength(cartLength + 1);
    }

    const toggleSidebar = () => {
        setIsSideBarOpen(!isSidebarOpen);
        setIsRefresh(false);
    }

    const closeModalCart = () => {       
        setIsModalCartOpen(false); 
        setIsModalOpen(false);
    }

    const openModalCart = () => {
        setIsModalCartOpen(true);
        setIsModalOpen(true);
    }

    const openAlertModal = (msg) => {
        setAlertMsg(msg);
        setIsModalAlertOpen(true);
    }

    const closeAlertModal = () => {
        setAlertMsg();
        setIsModalAlertOpen(false);
    }

    const openConfEmailModal = () => {
        setIsModalConfEmailOpen(true);
        setIsModalOpen(true);
    }

    const closeConfEmailModal = () => {
        setIsModalConfEmailOpen(false);
        setIsModalOpen(false);
    }

    const openChangePassModal = () => {
        setIsModalChangePassOpen(true);
        setIsModalOpen(true);
    }

    const closeChangePassModal = () => {
        setIsModalChangePassOpen(false);
        setIsModalOpen(false);
    }

    const userLogin = localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN);

    if(userLogin == null){
        return <Navigate to={"/auth"} replace/>
    }

    return (
        <>
            <div className={`bg-[rgba(0,0,0,0.6)] w-full z-40 h-full fixed top-0 ${isModalOpen ? 'block': 'hidden'}`}>
            </div>

            <div className={`lg:flex relative z-30 ${isModalOpen ? 'blur-sm' : ""}`}>
                <Sidebar handlerSidebar={{isSidebarOpen, toggleSidebar, isRefresh}}/>
                <div className="flex flex-col w-full">
                    <Navbar toggleSidebar={toggleSidebar} openModalCart={openModalCart} cartLength={cartLength}/>
                    <main className="px-20 min-h-[79vh]">
                        {/* <Breadcrumb /> */}
                        <Outlet context={{handlingCartLength, openAlertModal, openConfEmailModal}}/>
                    </main>
                <Footer />
                </div>
            </div>
            <ModalCart isModalCartOpen={isModalCartOpen} closeModalCart={closeModalCart} />
            <ModalAlertMsg alertMsg={alertMsg} isModalAlertOpen={isModalAlertOpen} closeAlertModal={closeAlertModal}/>
            <ModalConfEmail isModalConfEmaiLOpen={isModalConfEmaiLOpen} funcModal={{closeConfEmailModal, openChangePassModal}}/>
            <ModalChangePass isModalChangePassOpen={isModalChangePassOpen} closeChangePassModal={closeChangePassModal}/>
        </>
        
    )
}


export default MainLayout;