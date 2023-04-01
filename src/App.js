import React from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login';
import Home from './pages/Home';
import { DefaultLayout } from './layouts';
import RequireAuth from './components/RequireAuth';
import AddProduct from './pages/Product';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="/" element={<DefaultLayout />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />}></Route>
              <Route path="/add/product" element={<AddProduct />}></Route>
            </Route>
          </Route>

        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;