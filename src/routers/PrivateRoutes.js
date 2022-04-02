import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext';

export const PrivateRoutes = ({ children}) => {
    const { user } = useContext(AuthContext);

    const location = useLocation();
    localStorage.setItem('lastPath', location.pathname);

    return user.logged
            ? children
            : <Navigate to={'/login'} />
}
