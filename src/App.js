import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthLayout, DefaultLayout } from './layouts';
import { PATH } from './constants/Paths';
import {
  CategoryRoutes, ProductRoutes, SizeRoutes
} from './pages';
import Login from './pages/auth/Login';
import RequireAuth from './components/requireAuth';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path={PATH.LOGIN} element={<Login />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path={PATH.INDEX} element={<DefaultLayout />}>
              <Route path={PATH.PRODUCTS + PATH.CHILDREN} element={<ProductRoutes />} />
              <Route path={PATH.CATEGORIES + PATH.CHILDREN} element={<CategoryRoutes />} />
              <Route path={PATH.SIZES + PATH.CHILDREN} element={<SizeRoutes />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;