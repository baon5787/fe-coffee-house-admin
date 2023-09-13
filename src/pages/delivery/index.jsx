import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "~/components/loading";
import { PATH } from "~/constants/Paths";
import { DeliveryOrdersLayout } from "~/features/delivery";

const DeliveryRoutes = () => {

    const DeliveryOrdersUnconfimred = lazy(() => import('./DeliveryOrdersUnconfimred'));
    const DeliveryOrdersUnaccomplished = lazy(() => import('./DeliveryOrdersUnaccomplished'));
    const DeliveryOrdersAccomplished = lazy(() => import('./DeliveryOrdersAccomplished'));
    const DeliveryOrderDetail = lazy(() => import('./DeliveryOrderDetail'));

    return (
        <Routes>
            <Route element={<DeliveryOrdersLayout />}>
                <Route
                    path={PATH.UNCONFIMRED}
                    element={
                        <Suspense fallback={<Loading />} >
                            <DeliveryOrdersUnconfimred />
                        </Suspense>
                    }
                />
                <Route
                    path={':code'}
                    element={
                        <Suspense fallback={<Loading />} >
                            <DeliveryOrderDetail />
                        </Suspense>
                    }
                />
                <Route
                    path={PATH.UNACCOMPLISHED}
                    element={
                        <Suspense fallback={<Loading />} >
                            <DeliveryOrdersUnaccomplished />
                        </Suspense>
                    }
                />
                <Route
                    path={PATH.ACCOMPLISHED}
                    element={
                        <Suspense fallback={<Loading />} >
                            <DeliveryOrdersAccomplished />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}

export default DeliveryRoutes