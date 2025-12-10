import { Routes, Route } from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { Tracking } from './pages/Tracking'
import { Error } from './error/Error'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    }

  useEffect(() => {
    // getting cart data
    
    loadCart();
  }, [])

  return (
    <>
      {/* the <Routes> components tells React all the pages that are in our website */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
        <Route path='checkout' element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
        <Route path='orders' element={< OrdersPage cart={cart} loadCart={loadCart}/>} />
        {/* <Route path='tracking' element={< Tracking cart={cart}/>} /> */}
        <Route path="/tracking/:orderId/:productId" element={<Tracking cart={cart} />} />

        <Route path='*' element={<Error cart={cart}/>} />
      </Routes>
    </>
  )
}

export default App
