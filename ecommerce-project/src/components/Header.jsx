import { NavLink } from "react-router";
import  cartIcon  from "../assets/images/icons/cart-icon.png";
import  searchIcon  from "../assets/images/icons/search-icon.png";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import "./Header.css";


export function Header({ cart }) {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const searchText = searchParams.get('search');
    const [search, setSearch] = useState(searchText || "");


    let totalQuantity = 0;
    
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    })

    const handleSearchInput = (event) => {
        setSearch(event.target.value);
    }

    const searchProduct = () => {
        navigate(`/?search=${search}`);
    }

    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link">
                        <img className="logo"
                            src="images/logo-white.png" />
                        <img className="mobile-logo"
                            src="images/mobile-logo-white.png" />
                    </NavLink>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search" value={search} onChange={handleSearchInput}/>

                    <button className="search-button"  onClick={searchProduct}>
                        <img className="search-icon" src={searchIcon} />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" to="/orders">

                        <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src={cartIcon} />
                        <div className="cart-quantity">{totalQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    )
}