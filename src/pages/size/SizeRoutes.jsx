import React, { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import Loading from "~/components/loading";
import { PATH } from "~/constants/Paths";
import { SizeLayout } from "~/features/size";
import { NotFoundLayout } from "~/layouts";

const SizeRoutes = () => {

    const Size = lazy(() => import('./Size'));
    const DisenableSize = lazy(() => import('./DisenableSize'));
    const SizeNotFound = lazy(() => import('./SizeNotFound'));

    const element = useRoutes([
        {
            element: <SizeLayout />,
            children: [
                {
                    index: true,
                    element: <Suspense fallback={<Loading />}><Size /></Suspense>
                },
                {
                    path: PATH.DISENABLE,
                    element: <Suspense fallback={<Loading />}><DisenableSize /></Suspense>
                },
            ],
        },
        {
            element: <NotFoundLayout />,
            children: [
                {
                    path: PATH.NOT_FOUND,
                    element: <Suspense fallback={<Loading />}><SizeNotFound /></Suspense>
                },
                {
                    path: '*',
                    element: <Suspense fallback={<Loading />}><SizeNotFound /></Suspense>
                },
            ]
        }
    ])

    return element;
}

export default SizeRoutes