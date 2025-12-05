import { Link } from "react-router";
import { Header } from "../components/Header";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./Tracking.css";

export function Tracking({cart}) {

    const {orderId, productId} = useParams(); // destructuring
    const [order, setOrder] = useState(null)

    useEffect(()=> {
        const fetchOrdersData = async () => {
            const response = await axios(`/api/orders/${orderId}?expands=products`);
            setOrder(response.data);
        }
        fetchOrdersData();
    }, [orderId]) // this will reload the order if orderId changes

    if(!order) { return null;}
    console.log(order);

    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });
    

    return (
        <>
            <title>Tracking</title>
            <link rel="icon" href="images/tracking-favicon.png" />

            <Header cart={cart}/>

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {/* Arriving on Monday, June 13 */}
                        {
                            dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd MMMM D")
                        }
                    </div>

                    <div className="product-info">
                        {
                            orderProduct.name
                        }
                    </div>

                    <div className="product-info">
                        Quantity: 1
                    </div>

                    <img className="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    )

}