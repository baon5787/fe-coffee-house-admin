import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom';
import Loading from '~/components/loading';
import { PATH } from '~/constants/Paths';
import { ProductLayout, ProductNotFoudLayout } from '~/features/product';

const ProductRoutes = () => {

    const Product = lazy(() => import('./Product'));
    const AddEditProduct = lazy(() => import(`./AddEditProduct`));
    const DisenableProduct = lazy(() => import(`./DisenableProduct`));
    const ProductNotFound = lazy(() => import(`./ProductNotFound`));

    return (
        <Routes>
            <Route element={<ProductLayout />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<Loading />} >
                            <Product />
                        </Suspense>
                    }
                />
                <Route
                    path={PATH.ADD}
                    element={
                        <Suspense fallback={<Loading />} >
                            <AddEditProduct />
                        </Suspense>
                    }
                />
                <Route
                    path={PATH.UPDATE_PRODUCTS}
                    element={
                        <Suspense fallback={<Loading />} >
                            <AddEditProduct />
                        </Suspense>
                    }
                />
                <Route
                    path={PATH.DISENABLE}
                    element={
                        <Suspense fallback={<Loading />} >
                            <DisenableProduct />
                        </Suspense>
                    }
                />

            </Route>
            <Route element={<ProductNotFoudLayout />}>
                <Route
                    path={PATH.NOT_FOUND}
                    element={
                        <Suspense fallback={<Loading />} >
                            <ProductNotFound />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<Loading />} >
                            <ProductNotFound />
                        </Suspense>}
                />
            </Route>
        </Routes>
    )
}

export default ProductRoutes;
