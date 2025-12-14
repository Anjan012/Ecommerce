import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react"; // this renders a component in a fake web page, screen lets us check the fake web page
import { Product } from "./Product";

describe('Product component', () => {
    it('displays the products details correctly', () => {
        // While testing the component we render the component

        const product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };

        // we should not contact a real backend cause the backend might not be available during the test and it might accidently update the real data a best practice is to mock the function in our test {mock : create a fake version of the function  }
        const loadCart = vi.fn(); // vi.fn() : creates a fake function that doesn't do anything 
        render(<Product product={product} loadCart={loadCart}/>);


        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs') // searches the screen or a fake webpage for a element with specific text
        ).toBeInTheDocument();

        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

        expect(
            screen.getByTestId('product-rating-star-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png');

        expect(
            screen.getByText('87')
        ).toBeInTheDocument();
    });
});