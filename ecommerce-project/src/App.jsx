import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import './App.css'

function App() {

  return (
    <>
      {/* the <Routes> components tells React all the pages that are in our website */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route index element={<HomePage />} />
        <Route path='checkout' element={<CheckoutPage />} />
        <Route path='orders' element={< OrdersPage />} />
      </Routes>
    </>
  )
}

export default App
