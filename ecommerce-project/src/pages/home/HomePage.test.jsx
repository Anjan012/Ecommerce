import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react"; // this renders a component in a fake web page, screen lets us check the fake web page
import userEvent from "@testing-library/user-event"; // this lets us simulate event like clicking a button
import axios from "axios";
import { Product } from "./Product";
import { HomePage } from "./HomePage";
import { MemoryRouter } from "react-router"; // it is specifically for testing 

vi.mock('axios');

describe("HomePage Component", () => {

    let loadCart;

    beforeEach(() => {
        loadCart = vi.fn();

        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === "/api/products") {
                // In this fake we should match axios.get normally returns 
                return {
                    data: [
                        {
                            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                            rating: {
                                stars: 4.5,
                                count: 87
                            },
                            priceCents: 1090,
                            keywords: ["socks", "sports", "apparel"]
                        },
                        {
                            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            image: "images/products/intermediate-composite-basketball.jpg",
                            name: "Intermediate Size Basketball",
                            rating: {
                                stars: 4,
                                count: 127
                            },
                            priceCents: 2095,
                            keywords: ["sports", "basketballs"]
                        }
                    ]
                }
            }
        })
    })

    it("displays the products correctly", async () => {
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart} />
            </MemoryRouter>
        )
        const productContainer = await screen.findAllByTestId('product-container'); // find does the same thing as get but it will wait until it finds this element. We need to use find because products is an empty array at inital and homepage uses the useEffect to get the products || since this code waits it is an async code and it returns a promise

        expect(productContainer.length).toBe(2);

        expect(
        // within lets us find things within a specific element 
            within(productContainer[0])
                .getByText('Black and Gray Athletic Cotton Socks - 6 Pairs') // searches inside the first product container
        ).toBeInTheDocument(); 

        expect(
            within(productContainer[1]).getByText('Intermediate Size Basketball')
        ).toBeInTheDocument();
    })

})
