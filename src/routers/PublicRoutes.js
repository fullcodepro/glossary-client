import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../components/context/AuthContext';

export const PublicRoutes = ({ children, ...props }) => {

    // console.log(props)
    const { user } = useContext(AuthContext);

    return user.logged
        ? <Navigate to={'/'} />
        : children
}
