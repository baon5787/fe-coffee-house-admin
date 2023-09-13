import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "~/components/loading";
import { PATH } from "~/constants/Paths";
import { OrderLayout } from "~/features/order";

const OrderRoutes = () => {

    const OrderDetail = lazy(() => import('./OrderDetail'));
    const Order = lazy(() => import('./Order'))

    return (
        <Routes>
            <Route element={<OrderLayout />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<Loading />} >
                            <Order />
                        </Suspense>
                    }
                />
                <Route
                    path={PATH.ORDERS_DETAILS}
                    element={
                        <Suspense fallback={<Loading />} >
                            <OrderDetail />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}

export default OrderRoutes;