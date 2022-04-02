import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../components/context/AuthContext';
import { types } from '../types/types';

export const NavBar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch({
            types: types.logout,
        });

        navigate('/login', {
            replace:true
        })
    }

     
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <Link
                className="navbar-brand px-2"
                to="/"
            >
                HTC-Inventarios
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav px-2">

                    <NavLink
                        className={({ isActive }) => `px-1 nav-item nav-link ${(isActive && 'active')}`}
                        to="/home"
                    >
                        Inicio
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => `px-1 nav-item nav-link ${(isActive && 'active')}`}
                        to="/new"
                    >
                        Nuevo
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">

                    <span className='nav-item nav-link text-info'>
                        { user.lastName }
                    </span>
                    <button
                        className="nav-item nav-link btn"
                        onClick={handleLogout}
                    >
                        Salir
                    </button>
                </ul>
            </div>
        </nav>
    )
}