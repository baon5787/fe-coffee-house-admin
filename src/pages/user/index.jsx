import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom';
import Loading from '~/components/loading';
import { PATH } from '~/constants/Paths';
import { UserLayout } from '~/features/user';

const UserRoutes = () => {


    const Users = lazy(() => import('./Users'));
    const UsersDetails = lazy(() => import('./UsersDetails'));

    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route index
                    element={
                        <Suspense fallback={<Loading />} >
                            <Users />
                        </Suspense>
                    }
                />
                <Route
                    path={PATH.USER_DETAILS}
                    element={
                        <Suspense fallback={<Loading />} >
                            <UsersDetails />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}

export default UserRoutes;