import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({cart}) {

    const [products, setProducts] = useState([]);
  

    useEffect(() => {
        axios.get('/api/products') // this will fetch the data from backend and in that time the code will not wait keeps executing and in the future when the data is received it will execute the then block which will execute the function inside it. when fetch gets the data it will save the data in the parameter below response note: unlike fetch we will get the data in the response.data and it is a cleaner way to make API requests
        .then((response) => {
            setProducts(response.data);
        }); 

       
    }, [])

    

    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" href="images/home-favicon.png" />

            <Header cart={cart}/>
            <div className="home-page">
                <ProductsGrid products={products}/>
            </div>
        </>
    );
}