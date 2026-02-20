import TitlePage from "../Components/TitlePage"
import { ProductCard } from "../Components/MainCard";
import { useOutletContext } from "react-router-dom";

const Product = () => {
    const outlietContext = useOutletContext();

    return (
        <>
            <TitlePage title={'Product'}/>
            <section className="flex flex-row item-center justify-between font-montserrat gap-3 flex-wrap-reverse md:flex-nowrap mb-3">
                <div className="flex flex-row gap-4">
                    <select name="" id="filterCategory" className="py-2 px-2 border-[0.8px] border-gray-300 w-auto rounded-md shadow-sm hover:cursor-pointer" defaultValue={'Category'}>
                        <option>Category</option>
                    </select>
                    <select name="" id="filterPrice" className="py-2 px-2 border-[0.8px] border-gray-300 w-auto rounded-md shadow-sm hover:cursor-pointer" defaultValue={'Harga'}>
                        <option >Price</option>
                    </select>
                </div>
                <div className="flex flex-row gap-2 w-full md:w-auto">
                    <form action="" method="post" className="flex flex-row gap-3 items-center font-montserrat w-full">
                        <input type="text" name="search" id="" className="w-full py-[10px] px-3 border-[0.8px] border-gray-300 rounded-md outline-[0.8px] outline-primary" placeholder="Search"/>
                        <button className="bg-blue-500 text-white py-[10px] px-3 rounded-md active:translate-y-[2px] transition duration-75">Search</button>
                    </form>
                </div>
            </section>
            <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-2">
                <ProductCard handlingCartLength={outlietContext.handlingCartLength} openAlertModal={outlietContext.openAlertModal}/>
                <ProductCard handlingCartLength={outlietContext.handlingCartLength} openAlertModal={outlietContext.openAlertModal} />
                <ProductCard handlingCartLength={outlietContext.handlingCartLength} openAlertModal={outlietContext.openAlertModal} />
                <ProductCard handlingCartLength={outlietContext.handlingCartLength} openAlertModal={outlietContext.openAlertModal} />
            </section>

        </>
    )
}


export default Product;