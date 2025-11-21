import { Routes, Route } from 'react-router'
import {HomePage} from './pages/HomePage'
import './App.css'

function App() {

  return (
    <>
      {/* the <Routes> components tells React all the pages that are in our website */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route index element={<HomePage />} />
        <Route path='checkout' element={<div>Checkout Page</div>} />
      </Routes>
    </>
  )
}

export default App
