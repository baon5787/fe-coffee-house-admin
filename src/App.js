import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages';
import { CategoryRoutes, CouponRoutes, OrderRoutes, ProductRoutes, SizeRoutes, DeliveryRoutes, UserRoutes, WarehouseRoutes } from './pages';
import { DefaultLayout } from './layouts';
import RequireAuth from './components/RequireAuth';
import { PATH } from './constants/Paths';
import './App.scss';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.LOGIN} element={<Login />}></Route>
          <Route element={<RequireAuth />}>
            <Route path={PATH.INDEX} element={<DefaultLayout />}>
              <Route path={PATH.PRODUCTS + PATH.CHILDREN} element={<ProductRoutes />} />
              <Route path={PATH.WAREHOUSES + PATH.CHILDREN} element={<WarehouseRoutes />} />
              <Route path={PATH.CATEGORIES + PATH.CHILDREN} element={<CategoryRoutes />} />
              <Route path={PATH.SIZES + PATH.CHILDREN} element={<SizeRoutes />} />
              <Route path={PATH.COUPONS + PATH.CHILDREN} element={<CouponRoutes />} />
              <Route path={PATH.ORDERS + PATH.CHILDREN} element={<OrderRoutes />} />
              <Route
                path={PATH.DELIVERY + '/' + PATH.ORDERS + PATH.CHILDREN}
                element={<DeliveryRoutes />}
              />
              <Route path={PATH.USER + PATH.CHILDREN} element={<UserRoutes />} />
            </Route>
          </Route>
        </Routes >
      </BrowserRouter >
    </>
  );
}

export default App;