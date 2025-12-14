import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react"; // this renders a component in a fake web page, screen lets us check the fake web page
import userEvent from "@testing-library/user-event"; // this lets us simulate event like clicking a button
import axios from "axios";
import { Product } from "./Product";

vi.mock('axios'); // this mocks the entire axios package when we import from axios we will get a fake version of axios

describe('Product component', () => {

    let product;

    // we should not contact a real backend cause the backend might not be available during the test and it might accidently update the real data a best practice is to mock the function in our test {mock : create a fake version of the function  }
    let loadCart; 


    // befoore each test we can recreate this variables
    beforeEach(() => { // beforeEach is a test hook
        product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        }

        loadCart = vi.fn();
    })

    it('displays the products details correctly', () => {

        render(<Product product={product} loadCart={loadCart} />);


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

    it('adds a product to a cart', async () => {

        render(<Product product={product} loadCart={loadCart} />);

        const user = userEvent.setup(); // setup event now we can simulate event
        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton); // since clicking a button requires time we need to use await 

        // This checks when we click add to cart does our code run axios.post and give it these values even though mock doesn't do anything we can still check does we call and gave them correct values
        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        );
        expect(loadCart).toHaveBeenCalled(); // it checks if it has been call only
    })

});