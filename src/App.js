import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages';
// import { CategoryRoutes, CouponRoutes, OrderRoutes, ProductRoutes, SizeRoutes, DeliveryRoutes, UserRoutes, WarehouseRoutes } from './pages';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          {/* <Route path="/" element={<DefaultLayout />}>
            <Route element={<RequireAuth />}>
              <Route path={PATH.PRODUCTS + PATH.CHILDREN} element={<ProductRoutes />} />
              {/* <Route path='/:sku' element={<AddEditProduct />} />
                  <Route path={PATH.DISENABLE} element={<DisenableProduct />} /> 
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
        </Route>*/}
        </Routes >
      </BrowserRouter >
    </>
  );
}

export default App;