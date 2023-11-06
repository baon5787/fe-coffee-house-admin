import React, { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import Loading from '~/components/loading'
import { PATH } from '~/constants/Paths'
import { CategoryLayout } from '~/features/categories'
import { NotFoundLayout } from '~/layouts'

const CategoryRoutes = () => {

    const ParentCategory = lazy(() => import('./ParentCategory'));
    const SubCategory = lazy(() => import('./SubCategory'));
    const DisableCategory = lazy(() => import('./DisableCategory'));
    const CategoryNotFound = lazy(() => import('./CategoryNotFound'));

    const element = useRoutes([
        {
            element: <CategoryLayout />,
            children: [
                {
                    path: PATH.PARENT,
                    element: <Suspense fallback={<Loading />}><ParentCategory /></Suspense>
                },
                {
                    path: PATH.SUB,
                    element: <Suspense fallback={<Loading />}><SubCategory /></Suspense>
                },
                {
                    path: PATH.DISENABLE,
                    element: <Suspense fallback={<Loading />}><DisableCategory /></Suspense>
                },
            ],
        },
        {
            element: <NotFoundLayout />,
            children: [
                {
                    path: PATH.NOT_FOUND,
                    element: <Suspense fallback={<Loading />}><CategoryNotFound /></Suspense>
                },
                {
                    path: '*',
                    element: <Suspense fallback={<Loading />}><CategoryNotFound /></Suspense>
                },
            ]
        }
    ])

    return element
}

export default CategoryRoutes