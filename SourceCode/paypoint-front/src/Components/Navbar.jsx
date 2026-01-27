import { Route, Link } from "react-router-dom";
import {  useState, useEffect } from "react";


const ProfilePict = (toggle) => {
    return (
        <>
            <div className="border-0 rounded-[20px] w-10 h-10 bg-slate-300 flex justify-center items-center cursor-pointer text-5xl" onClick={toggle.toggleProfileDropdown}>
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
                <li className="px-5 py-3 mb-1 flex items-center hover:bg-hover border-b-[1px] border-gray-100 text-red-600 hover:text-primary-text">
                   <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12q0-2.1.788-3.912t2.137-3.163l1.4 1.4q-1.1 1.1-1.712 2.55T4 12q0 3.35 2.325 5.675T12 20t5.675-2.325T20 12q0-1.675-.612-3.125t-1.713-2.55l1.4-1.4q1.35 1.35 2.138 3.163T22 12q0 2.075-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m-1-9V2h2v11z"/></svg>
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
        <header className="w-full h-14 px-20 py-3 flex items-center shadow-md sticky top-0 bg-slate-50 z-40 mb-5">
            <ProfileDropdown toggleDropdown={{isDropProfileOpen, isHidden}}/>
            <nav className="flex justify-between items-center font-montserrat w-full">
                <div className="flex lg:hidden">
                    <Link to="/">
                        <h1 className="text-2xl font-bold">Paypoint</h1>
                    </Link>
                    <button className="ms-2 w-8 h-8 bg-primary border-1 border-white/100 flex
                    item-center justify-center p-1 rounded-lg" type="button" onClick={propsNav.toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"/></svg>
                    </button>
                </div>
                <div className="flex lg:absolute lg:right-20 flex-row gap-3 items-center">
                    <button className="w-8 h-8 bg-blue-500 flex justify-center items-center rounded-md text-white relative" type="button" onClick={propsNav.openModalCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M8.418 3.25c.28-.59.884-1 1.582-1h4c.698 0 1.301.41 1.582 1c.683.006 1.216.037 1.692.223a3.25 3.25 0 0 1 1.426 1.09c.367.494.54 1.127.776 1.998l.742 2.722l.28.841l.024.03c.901 1.154.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91c-.858-3.431-1.287-5.147-.386-6.301l.024-.03l.28-.841l.742-2.722c.237-.871.41-1.505.776-1.999a3.25 3.25 0 0 1 1.426-1.089c.476-.186 1.008-.217 1.692-.222m.002 1.502c-.662.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.176.237-.28.568-.57 1.635l-.57 2.089C6.384 9 7.778 9 9.684 9h4.631c1.907 0 3.3 0 4.32.18l-.569-2.089c-.29-1.067-.394-1.398-.57-1.635a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118A1.75 1.75 0 0 1 14 5.75h-4a1.75 1.75 0 0 1-1.58-.998" clip-rule="evenodd"/></svg>

                        <div className="h-3.5 w-3.5 absolute bg-primary right-[-4px] top-[-3px] border-0 rounded-xl"></div>
                    </button>
                    <ProfilePict toggleProfileDropdown={toggleProfileDropdown}/>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;