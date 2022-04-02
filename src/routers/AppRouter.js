import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRouter } from './DashboardRouter';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {
    return (
        <BrowserRouter>
        <Routes>
            
            <Route path='/login' element={
                <PublicRoutes>
                    <LoginScreen />
                </PublicRoutes>
            } />

            <Route path='/*' element={
                <PrivateRoutes>
                    <DashboardRouter />
                </PrivateRoutes>
            } />
            
        </Routes>
        
        </BrowserRouter>
    )
}
