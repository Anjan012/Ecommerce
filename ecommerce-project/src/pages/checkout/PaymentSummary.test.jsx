import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react"; // this renders a component in a fake web page, screen lets us check the fake web page
import { PaymentSummary } from "./PaymentSummary";
import { MemoryRouter, useLocation } from "react-router";
import axios from "axios";
import userEvent from "@testing-library/user-event";

vi.mock('axios');

describe("Payment Summary Component", () => {

    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummary = {
            "totalItems": 6,
            "productCostCents": 7254,
            "shippingCostCents": 499,
            "totalCostBeforeTaxCents": 7753,
            "taxCents": 775,
            "totalCostCents": 8528
        }

        loadCart = vi.fn();

        user = userEvent.setup();
    })

    it('it displays the correct detials', async () => {
        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
            </MemoryRouter>
        )

        expect(
            screen.getByText('Items (6):')
        ).toBeInTheDocument();

        expect(
            within(screen.getByTestId('payment-summary-product-cost'))
            .getByText("$72.54")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("payment-summary-shipping-cost")
        ).toHaveTextContent("$4.99");

        expect(
            screen.getByTestId("payment-summary-total-before-tax")
        ).toHaveTextContent("$77.53");

        expect(
            screen.getByTestId("payment-summary-tax")
        ).toHaveTextContent("$7.75");

        expect(
            screen.getByTestId("payment-summary-total")
        ).toHaveTextContent("$85.28");
    });

    it("places an Order", async () => {

        function Location () {
            const location = useLocation();
            return <div data-testid="url-path">{location.pathname}</div>;
        }

         render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
                <Location />
            </MemoryRouter>
        )

        const placeOrderButton = screen.getByTestId("place-order-button");
        await user.click(placeOrderButton);

        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
    });

})