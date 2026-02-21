import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="w-full h-14 px-20 py-3 flex items-center shadow-md sticky top-0 bg-slate-50 z-40">
            <div className="flex">
                    <Link to="/login">
                        <h1 className="text-2xl font-bold">Paypoint</h1>
                    </Link>
                </div>
        </header>
    )
}

export default Navbar;