import { Route, Link } from "react-router-dom";
import {  useState, useEffect } from "react";


const ProfilePict = (toggle) => {
    return (
        <>
            <div className="border-0 rounded-[20px] w-10 h-10 bg-gray-400 flex justify-center items-center cursor-pointer text-5xl" onClick={toggle.toggleProfileDropdown}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/></svg>
            </div>
        </>
    )
}

const ProfileDropdown = (toggle) => {
    return (
    <div className={`absolute w-56 h-100 top-12 bg-white right-28 rounded-md shadow-md border-[0.8px] border-gray-200  ${toggle.toggleDropdown.isHidden ? 'hidden': ''}  ${toggle.toggleDropdown.isDropProfileOpen ? `animate-slide-up opacity-100 ` : `animate-slide-down opacity-0 translate-y-14 `} `} id="profileDropdown">
        <ul className="font-montserrat text-gray-700">
            <Link>
                <li className="px-5 py-3 mb-1 flex items-center hover:bg-hover border-b-[1px] border-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/></svg>
                    <p className="ms-2">John Doe</p>
                </li>
            </Link>
             <Link>
                <li className="px-5 py-3 mb-1 flex items-center hover:bg-hover border-b-[1px] border-gray-100">
                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"/></svg>
                    <p className="ms-2">Logout</p>
                </li>
            </Link>
        </ul>
    </div>
    )
}

const Navbar = (propsNav) => {
    const [isDropProfileOpen, setIsDropProfileOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(true);
    
    const toggleProfileDropdown = () => {
        setIsDropProfileOpen(!isDropProfileOpen);
    };

    useEffect(() => {
        let timerClose, timerOpen;

        if(isDropProfileOpen == false){
            timerClose = setTimeout(()=> {
                setIsHidden(true);
            }, 100);
        }else {
            timerOpen = setTimeout(() => {
                setIsHidden(false);
            }, 0);
        }
        
        return () => {
            clearTimeout(timerClose);
            clearTimeout(timerOpen);
        }
    }, [isDropProfileOpen]);
    
    return (
        <header className="w-full h-14 px-20 py-3 flex items-center shadow-md sticky top-0 bg-slate-50 z-40">
            <ProfileDropdown toggleDropdown={{isDropProfileOpen, isHidden}}/>
            <nav className="flex justify-between items-center font-montserrat w-full">
                <div className="flex">
                    <Link to="/">
                        <h1 className="text-2xl font-bold">Paypoint</h1>
                    </Link>
                    <button className="ms-2 w-8 h-8 bg-primary border-1 border-white/100 flex
                    item-center justify-center p-1 rounded-lg" type="button" onClick={propsNav.toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"/></svg>
                    </button>
                </div>
                <div className="flex">
                    <ProfilePict toggleProfileDropdown={toggleProfileDropdown}/>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;