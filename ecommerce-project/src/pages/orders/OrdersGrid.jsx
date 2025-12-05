
import { OrderHeader } from "./OrderHeader";
import { OrderDeatils } from "./OrdersDetails";

export function OrdersGrid({ orders }) {
    return (
        <div className="orders-grid">
            {
                orders.map((order) => {
                    return (
                        <div key={order.id} className="order-container">

                            <OrderHeader order={order} />

                            <OrderDeatils order={order} />
                        </div>
                    );
                })
            }
        </div>
    )
}