import TitlePage from "../Components/TitlePage"
import { ProductCard } from "../Components/MainCard";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
    const [dataProduct, setDataProduct] = useState([]);
    const [mainProductData, setMainProductData] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataPrice, setDataPrice] = useState([]);
    const outlietContext = useOutletContext();
    const URI = import.meta.env.VITE_API_URL;
    let localData = localStorage.getItem(import.meta.env.VITE_KEY_USERLOGIN)
    localData = JSON.parse(localData);
    let email;
    
    if (localData != undefined){
        email = localData.email;
    }

    useEffect(() => {
        getAllProduct();

        axios.get(`${URI}product/get/price-range`, {params: {email}})
        .then((res) => {
            const datas = res.data;
            const rpFormatter = new Intl.NumberFormat("id-ID", {
                style: 'currency',
                currency: 'IDR'
            });

            if(datas.status == 200){
                let arrObj = [];
                datas.data.forEach(elm => {
                    let obj;
                    if (elm.price_start > 200000){
                        obj = {
                            id: elm._id,
                            priceRange: `>= ${rpFormatter.format(elm.price_start)}`
                        };
                    } else{
                        obj = {
                            id: elm._id,
                            priceRange: `${rpFormatter.format(elm.price_start)} - ${rpFormatter.format(elm.price_end)}`
                        };
                    }

                    arrObj.push(obj);
                });

                setDataPrice(arrObj);
            } else {
                throw new Error(res.msg);
            }
        }).catch((err) => {
            outlietContext.openAlertModal("Gagal mengambil data rentang harga", 0);
        })

        axios.get(`${URI}category/get`, {params: {email}})
        .then((res) => {
            const datas = res.data;

            if(datas.status == 200){
                setDataCategory(datas.categories);
            } else {
                throw new Error("Gagal mengambil data");
            }
        }).catch((err) => {
            outlietContext.openAlertModal("Gagal mengambil data kategori", 0);
        });
    }, []);

    const getAllProduct = () => {
        axios.get(`${URI}product/get`, {params: {email}})
        .then((res) => {
            const datas = res.data;

            if(datas.status == 200){
                setDataProduct(datas.product);
                setMainProductData(datas.product);
            } else {
                throw new Error("Gagal mengambil data");
            }
        }).catch((err) => {
            outlietContext.openAlertModal("Gagal mengambil data", 0);
        });
    }

    const getProductByCategory = (e) => {
        const idCategory = e.target.value;
        
        if(idCategory != "default"){
            axios.get(`${URI}product/get/category/${idCategory}`, {params: {email}})
            .then((res) => {
                const datas = res.data;

                if(datas.status == 200){
                    setDataProduct(datas.product);
                    setMainProductData(datas.product);
                } else {
                    throw new Error("Gagal mengambil data");
                }

            }).catch((err) => {
                outlietContext.openAlertModal("Gagal mengambil data", 0);
            })
        } else {
            getAllProduct();
        }
    }

    const getProductByPrice = (e) => {
        const prductId = e.target.value;
        if(prductId != "default"){
            axios.get(`${URI}product/get/price-range/${prductId}`, {params: {email}})
            .then((res) => {
                const datas = res.data;
    
                if(datas.status == 200){
                    setDataProduct(datas.product);
                    setMainProductData(datas.product);
                } else {
                    throw new Error("Gagal mengambil data");
                }
    
            }).catch((err) => {
                outlietContext.openAlertModal("Gagal mengambil data", 0);
            })
        } else {
            getAllProduct();
        }
    }

    const searchProductName = (e) => {
        const inputSearch = e.target.value;
        
        if(inputSearch.trim().length != 0){
            let productFilter = dataProduct.filter((data) => {
                return data.product_name.includes(inputSearch);
            });

            setMainProductData(productFilter);
        } else {
            setMainProductData(dataProduct);
        }
    }

    let productCard;

    if (mainProductData.length > 0){
        productCard = mainProductData.map(product=> (
            <ProductCard handlingCartLength={outlietContext.handlingCartLength} openAlertModal={outlietContext.openAlertModal} product={product} key={product.id}/>
        ))
    } else {
        productCard = <p>Tidak ada data</p>
    }
    
    return (
        <>
            <TitlePage title={'Product'}/>
            <section className="flex flex-row item-center justify-between font-montserrat gap-3 flex-wrap-reverse md:flex-nowrap mb-3">
                <div className="flex flex-row gap-4">
                    <div className="relative">
                        <select name="" id="filterCategory" className="py-2 px-5 border-[0.8px] border-gray-300 w-auto rounded-md shadow-sm hover:cursor-pointer appearance-none" defaultValue={'default'} onChange={getProductByCategory}>
                            <option value={'default'}>Category</option>
                            {dataCategory.map(category => (
                                <option key={category._id} value={category._id}>{category.category}</option>
                            ))}
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24" className="absolute right-3 pointer-events-none top-2">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z" />
                        </svg>
                    </div>
                    <div className="relative">
                    <select name="" id="filterPrice" className="py-2 px-2 border-[0.8px] border-gray-300 w-40 rounded-md shadow-sm hover:cursor-pointer appearance-none" defaultValue={'default'} onChange={getProductByPrice}>
                        <option value={'default'}>Price</option>

                        {
                            dataPrice.map(price => (
                                <option key={price.id} value={price.id}>{price.priceRange}</option>
                            ))
                        }
                    </select>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24" className="absolute right-0 pointer-events-none top-2">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" d="m12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8L18 9.4z" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full md:w-auto">
                    <form action="" method="post" className="flex flex-row gap-3 items-center font-montserrat w-full">
                        <input type="text" name="search" id="" className="w-full py-[10px] px-3 border-[0.8px] border-gray-300 rounded-md outline-[0.8px] outline-primary" placeholder="Search" onKeyUp={searchProductName}/>
                    </form>
                </div>
            </section>
            <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-1 gap-2">
                {productCard}
                {/* <ProductCard handlingCartLength={outlietContext.handlingCartLength} openAlertModal={outlietContext.openAlertModal} />
                <ProductCard handlingCartLength={outlietContext.handlingCartLength} openAlertModal={outlietContext.openAlertModal} />
                <ProductCard handlingCartLength={outlietContext.handlingCartLength} openAlertModal={outlietContext.openAlertModal} /> */}
            </section>

        </>
    )
}


export default Product;