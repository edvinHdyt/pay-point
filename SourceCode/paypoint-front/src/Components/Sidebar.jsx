import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = (propsSidebar) => {
    const [animSlideLeft, setAnimSlideLeft] = useState('');

    useEffect(() => {
        let timerId;

        if (!propsSidebar.handlerSidebar.isSidebarOpen && !propsSidebar.handlerSidebar.isRefresh){
            timerId = setTimeout(() => {
                setAnimSlideLeft('animate-slide-left');
            }, 0)
        }

        return () => {
            clearTimeout(timerId);

            timerId = setTimeout(() => {
                setAnimSlideLeft('');
            }, 600);

            clearTimeout(timerId)
        }
    }, [propsSidebar.handlerSidebar.isSidebarOpen, propsSidebar.handlerSidebar.isRefresh]);
    
    return (
        <div className={`w-full  sm:w-80 z-50 left-0 top-0 bg-slate-50 py-5 px-10 flex flex-col font-montserrat lg:border-[2px] h-screen fixed lg:sticky lg:translate-x-0  ${propsSidebar.handlerSidebar.isSidebarOpen ? 'animate-slide-right translate-x-[0]' :`${animSlideLeft} translate-x-[-40rem]`}`}>
            <div className="flex justify-center items-center mb-3 relative">
                <div className="w-32 h-auto bg-primary flex justify-center items-center rounded-md shadow-md">
                    <h2 className="text-2xl font-bold">
                        Paypoint
                    </h2>
                </div>
                <button className="absolute right-[-1rem] bg-red-600 text-white w-10 h-10 border-0 rounded-md justify-center items-center flex lg:hidden active:translate-y-[2px] transition duration-75" onClick={propsSidebar.handlerSidebar.toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                </button>
            </div>
            <ul>
                <NavLink to={"dashboard"} className={({ isActive }) =>isActive ? "px-4 py-3 border-0 rounded-md flex item-center mb-2 hover:bg-hover bg-primary" : "px-4 py-3 border-0 rounded-md flex item-center mb-2 hover:bg-hover"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"/></svg>
                    <span className="ms-2 text-secondary-text">Dashboard</span>
                </NavLink>
                <NavLink to={"category"} className={({ isActive }) =>isActive ? "px-4 py-3 border-0 rounded-md flex item-center mb-2 hover:bg-hover bg-primary" : "px-4 py-3 border-0 rounded-md flex item-center mb-2 hover:bg-hover"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 5h14v2H7zm0 8v-2h14v2zM4 4.5A1.5 1.5 0 0 1 5.5 6A1.5 1.5 0 0 1 4 7.5A1.5 1.5 0 0 1 2.5 6A1.5 1.5 0 0 1 4 4.5m0 6A1.5 1.5 0 0 1 5.5 12A1.5 1.5 0 0 1 4 13.5A1.5 1.5 0 0 1 2.5 12A1.5 1.5 0 0 1 4 10.5M7 19v-2h14v2zm-3-2.5A1.5 1.5 0 0 1 5.5 18A1.5 1.5 0 0 1 4 19.5A1.5 1.5 0 0 1 2.5 18A1.5 1.5 0 0 1 4 16.5"/></svg>
                    <span className="ms-2 text-secondary-text">Category</span>
                </NavLink>
                <NavLink to={"product"} className={({ isActive }) =>isActive ? "px-4 py-3 border-0 rounded-md flex item-center mb-2 hover:bg-hover bg-primary" : "px-4 py-3 border-0 rounded-md flex item-center mb-2 hover:bg-hover"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"/></svg>
                    <span className="ms-2 text-secondary-text">Poduct</span>
                </NavLink>
                <NavLink to={"product-master"} className={({ isActive }) =>isActive ? "px-4 py-3 border-0 rounded-md flex item-center mb-2 hover:bg-hover bg-primary" : "px-4 py-3 border-0 rounded-md flex item-center mb-2 hover:bg-hover"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h12v2H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H1V2h3.25z"/></svg>
                    <span className="ms-2 text-secondary-text">Product Master</span>
                </NavLink>
            </ul>
        </div>        
    )

}

export default Sidebar;