import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { useSearchParams } from "react-router";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {

    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');


    const [products, setProducts] = useState([]);


    // there is a problem of using async await and use effect in react, the inner function in useEffect should not return a promise it is breacking the rules of use effect
    useEffect(() => {
        const getHomeData = async () => {
            const urlPath = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
        }
        getHomeData();

    }, [search])



    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" href="images/home-favicon.png" />

            <Header cart={cart} />
            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </>
    );
}