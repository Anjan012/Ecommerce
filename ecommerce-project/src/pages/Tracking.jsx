import { Link } from "react-router";
import { Header } from "../components/Header";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import "./Tracking.css";

export function Tracking({ cart }) {

    const { orderId, productId } = useParams(); // destructuring
    const [order, setOrder] = useState(null)

    useEffect(() => {
        const fetchOrdersData = async () => {
            const response = await axios(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        }
        fetchOrdersData();
    }, [orderId]) // this will reload the order if orderId changes

    if (!order) { return null; }


    const orderProduct = order.products.find((orderProduct) => {
        return orderProduct.productId === productId;
    });

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
    // const timePassedMs = totalDeliveryTimeMs * 0.3;

    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
    if (deliveryPercent > 100) {
        deliveryPercent = 100;
    }

    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent === 100;
    return (
        <>
            <title>Tracking</title>
            <link rel="icon" href="images/tracking-favicon.png" />

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {deliveryPercent >= 100 ? "Delivered on" : "Arriving on"}
                        {
                            dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd MMMM D")
                        }
                    </div>

                    <div className="product-info">
                        {
                            orderProduct.product.name
                        }
                    </div>

                    <div className="product-info">
                        {
                            `Quantiy: ${orderProduct.quantity}`
                        }
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    )

}