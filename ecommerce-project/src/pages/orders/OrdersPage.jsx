import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";
import "./OrdersPage.css";

window.axios = axios; // // This makes axios available in the Console. Then, you can try running axios.post('/api/reset') in the Console.

export function OrdersPage({ cart, loadCart}) { // cart is a props

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data);

        }
        
        fetchOrders();
    }, [])


    return (
        <>
            <title>Orders</title>
            <link rel="icon" href="images/orders-favicon.png" />

            <Header cart={cart} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders} loadCart={loadCart}/>
            </div>
        </>
    )
}