import { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loading from '~/components/loading';
import { PATH } from '~/constants/Paths';
import { WarehouseLayout } from '~/features/warehouse';
import { NotFoundLayout } from '~/layouts';


const WarehouseRoutes = () => {

    const Warehouse = lazy(() => import('./Warehouse'));

    const WarehouseNotFound = lazy(() => import('./WarehouseNotFound'));

    const element = useRoutes([
        {
            element: <WarehouseLayout />,
            children: [{
                index: true,
                element: <Suspense fallback={<Loading />} ><Warehouse /></Suspense>
            }]
        },
        {
            element: <NotFoundLayout />,
            children: [
                {
                    path: PATH.NOT_FOUND,
                    element: <Suspense fallback={<Loading />}><WarehouseNotFound /></Suspense>
                },
                {
                    path: '*',
                    element: <Suspense fallback={<Loading />}><WarehouseNotFound /></Suspense>
                },
            ]
        }
    ])

    return element;
}

export default WarehouseRoutes;