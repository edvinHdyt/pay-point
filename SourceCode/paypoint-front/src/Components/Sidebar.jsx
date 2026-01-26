import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
                <h2 className="text-2xl font-bold">
                    Paypoint
                </h2>
                <button className="absolute right-[-1rem] bg-primary w-10 h-10 border-0 rounded-md justify-center items-center flex lg:hidden" onClick={propsSidebar.handlerSidebar.toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
                </button>
            </div>
            <ul>
                <Link to={"dashboard"}>
                    <li className="px-4 py-3 border-0 rounded-md flex item-center mb-2 hover:bg-hover bg-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-3q-.425 0-.712-.288T14 20v-5q0-.425-.288-.712T13 14h-2q-.425 0-.712.288T10 15v5q0 .425-.288.713T9 21H6q-.825 0-1.412-.587T4 19"/></svg>
                        <span className="ms-2 text-[#0F172A]">Dashboard</span>
                    </li>
                </Link>
                <Link to={"category"}>
                    <li className="px-4 py-3 border-0 rounded-md flex item-center mb-2 hover:bg-hover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 5h14v2H7zm0 8v-2h14v2zM4 4.5A1.5 1.5 0 0 1 5.5 6A1.5 1.5 0 0 1 4 7.5A1.5 1.5 0 0 1 2.5 6A1.5 1.5 0 0 1 4 4.5m0 6A1.5 1.5 0 0 1 5.5 12A1.5 1.5 0 0 1 4 13.5A1.5 1.5 0 0 1 2.5 12A1.5 1.5 0 0 1 4 10.5M7 19v-2h14v2zm-3-2.5A1.5 1.5 0 0 1 5.5 18A1.5 1.5 0 0 1 4 19.5A1.5 1.5 0 0 1 2.5 18A1.5 1.5 0 0 1 4 16.5"/></svg>
                        <span className="ms-2 text-[#0F172A]">Category</span>
                    </li>
                </Link>
            </ul>
        </div>        
    )

}

export default Sidebar;