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

  useEffect(() => {
    // getting cart data
    const fetchAppData = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    }
    fetchAppData();
  }, [])

  return (
    <>
      {/* the <Routes> components tells React all the pages that are in our website */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route index element={<HomePage cart={cart} />} />
        <Route path='checkout' element={<CheckoutPage cart={cart} />} />
        <Route path='orders' element={< OrdersPage cart={cart} />} />
        <Route path='tracking' element={< Tracking />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
