import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loading from '~/components/loading';
import { PATH } from '~/constants/Paths';
import { CouponLayout } from '~/features/coupon';


const CouponRoutes = () => {

    const Coupon = lazy(() => import('./Coupon'));
    const DisenableCoupon = lazy(() => import('./DisenableCoupon'));

    return (
        <Routes>
            <Route element={<CouponLayout />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<Loading />} >
                            <Coupon />
                        </Suspense>
                    }
                />
                <Route
                    path={PATH.DISENABLE}
                    element={
                        <Suspense fallback={<Loading />} >
                            <DisenableCoupon />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}

export default CouponRoutes;