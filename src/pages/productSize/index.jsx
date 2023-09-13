import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loading from '~/components/loading';
import { PATH } from '~/constants/Paths';
import { ProductSizeLayout } from '~/features/productSize';
import { NotFoundLayout } from '~/layouts';

const ProductSizeRoutes = () => {


    const ProductSize = lazy(() => import('./ProductSize'));

    const ProductSizeNotFound = lazy(() => import('./ProductSizeNotFound'));

    const element = useRoutes([
        {
            element: <ProductSizeLayout />,
            children: [{
                index: true,
                element: <Suspense fallback={<Loading />} ><ProductSize /></Suspense>
            }]
        },
        {
            element: <NotFoundLayout />,
            children: [
                {
                    path: PATH.NOT_FOUND,
                    element: <Suspense fallback={<Loading />}><ProductSizeNotFound /></Suspense>
                },
                {
                    path: '*',
                    element: <Suspense fallback={<Loading />}><ProductSizeNotFound /></Suspense>
                },
            ]
        }
    ])

    return element;
}

export default ProductSizeRoutes;
