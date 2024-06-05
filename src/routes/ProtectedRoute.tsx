import React from 'react';
import {useRecoilValue} from "recoil";
import {isLoginSelector} from "@/recoil/TokenAtom";
import {Navigate, Outlet, useLocation} from "react-router";

const ProtectedRoute = () => {
    const isLogin = useRecoilValue(isLoginSelector);
    const currentLocation = useLocation();

    return isLogin ? (
        <Outlet />
    ) : (
        <Navigate
            to='/login'
            replace
            state={{ redirectedFrom: currentLocation }}
        />
    );
};

export default ProtectedRoute;