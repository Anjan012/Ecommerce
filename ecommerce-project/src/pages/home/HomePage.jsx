import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart, loadCart }) {

    const [products, setProducts] = useState([]);


    // there is a problem of using async await and use effect in react, the inner function in useEffect should not return a promise it is breacking the rules of use effect
    useEffect( () => {
        const getHomeData = async () => {
            const response = await axios.get('/api/products') // it's recommended to use async await in react when we can instead of promises
            setProducts(response.data);
        }
        getHomeData();

    }, [])



    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" href="images/home-favicon.png" />

            <Header cart={cart} />
            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart}/>
            </div>
        </>
    );
}