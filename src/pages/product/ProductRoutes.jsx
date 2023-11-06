import React, { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom';
import Loading from '~/components/loading';
import { PATH } from '~/constants/Paths';
import { ProductLayout } from '~/features/product';
import { NotFoundLayout } from '~/layouts';

const ProductRoutes = () => {

    const Product = lazy(() => import('./Product'));

    const DisenableProduct = lazy(() => import('./DisenableProduct'));

    const AddEditProduct = lazy(() => import('./AddEditProduct'));

    const ProductNotFound = lazy(() => import('./ProductNotFound'));

    const element = useRoutes([
        {
            element: <ProductLayout />,
            children: [
                {
                    index: true,
                    element: <Suspense fallback={<Loading />}><Product /></Suspense>
                },
                {
                    path: PATH.ADD,
                    element: <Suspense fallback={<Loading />}><AddEditProduct /></Suspense>
                },
                {
                    path: PATH.UPDATE_PRODUCTS,
                    element: <Suspense fallback={<Loading />}><AddEditProduct /></Suspense>
                },
                {
                    path: PATH.DISENABLE,
                    element: <Suspense fallback={<Loading />}><DisenableProduct /></Suspense>
                },
            ],
        },
        {
            element: <NotFoundLayout />,
            children: [
                {
                    path: PATH.NOT_FOUND,
                    element: <Suspense fallback={<Loading />}><ProductNotFound /></Suspense>
                },
                {
                    path: '*',
                    element: <Suspense fallback={<Loading />}><ProductNotFound /></Suspense>
                },
            ]
        }
    ])

    return element;
}

export default ProductRoutes;