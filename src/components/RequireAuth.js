
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router-dom";

const RequireAuth = () => {

    const user = useSelector((state) => state.auth.login?.currentUser);
    const location = useLocation();

    const OFFSET = 300;

    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {

        const isScrollTopp = () => window.scrollY >= OFFSET ? setIsScroll(true) : setIsScroll(false);

        window.addEventListener('scroll', isScrollTopp);

        return () => {
            window.removeEventListener('scroll', isScrollTopp);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { sidebarRef } = useOutletContext();

    return (
        user?.accessToken
            ? <Outlet context={{
                sidebarRef: sidebarRef,
                isScroll: isScroll
            }} />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;