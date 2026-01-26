import { MainCard } from "../Components/MainCard";
import { Link } from "react-router-dom";

const AddCategory = () => {
    return (
        <>
            <h1 className="text-2xl text-tersier-text mb-3 font-bold">
                Add Category
            </h1>
            <MainCard>
                <form action="">
                    <div className="flex flex-col sm:flex-row sm:item-center sm:gap-4 gap-2  mb-3 font-montserrat mt-3">
                        <label htmlFor="category">Category</label>
                        <input type="text" name="categroy" id="category" className="w-full py-2 px-3 border-[0.8px] border-gray-400 rounded-md shadow-sm outline-primary"/>
                    </div>

                    <div className="flex justify-end items-center">
                        <Link to={'/category'}>
                            <button className="bg-gray-300 mr-2 p-2 rounded-md" type="button">
                                Kembali
                            </button>
                        </Link>
                        <button className="bg-blue-500 text-white p-2 rounded-md" type="button">
                            Submit
                        </button>
                    </div>
                </form>
            </MainCard>
            
        </>
    )
}

export default AddCategory;