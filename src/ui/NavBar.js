import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { AuthContext } from '../components/context/AuthContext';

import { GlossaryContext } from '../components/context/GlossaryContext';
import { types } from '../types/types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBell, faStar, faStarHalfStroke, faUser } from '@fortawesome/free-solid-svg-icons';

export const NavBar = () => {


    const { user, dispatch } = useContext(AuthContext);
    const { clearGlossary } = useContext(GlossaryContext)

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('glossary');
        dispatch({
            types: types.logout,
        });
        clearGlossary();
        return navigate('/login', {
            replace: true
        })
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">GLOSSARY</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0  d-flex w-100 p-1">



                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `px-1 nav-link ${(isActive && 'active')}`}
                                    to="/home"
                                    aria-current="page"
                                >
                                    Inicio
                                </NavLink>
                            </li>



                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) => `px-1 nav-link ${(isActive && 'active')}`}
                                    to="/new"
                                >
                                    Nuevo
                                </NavLink>
                            </li>



                            <ul className='navbar-nav ms-auto'>
                                <li className="nav-item dropdown ">
                                    <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faBell} />
                                    </NavLink>
                                    <ul className="dropdown-menu custom_dropdown p-0" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="#">
                                                <FontAwesomeIcon icon={faStarHalfStroke} /> Notif 1
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="#">
                                                <FontAwesomeIcon icon={faStarHalfStroke} /> Notif 2
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="#">
                                                <FontAwesomeIcon icon={faStarHalfStroke} /> Notif 3
                                            </Link>
                                        </li>

                                        <li><hr className="dropdown-divider" /></li>


                                        <li>
                                            <Link className="dropdown-item" to="#">
                                                <FontAwesomeIcon icon={faStar} /> Ver todas
                                            </Link>
                                        </li>

                                    </ul>
                                </li>


                                <li className="nav-item dropdown ">
                                    <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {/* <FontAwesomeIcon icon={faUser} /> */}
                                        {user.firstName}
                                    </NavLink>
                                    <ul className="dropdown-menu custom_dropdown_user" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="#">
                                                <FontAwesomeIcon icon={faUser} /> Mi perfil
                                            </Link>
                                        </li>
                                        <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <Link
                                            className="dropdown-item"
                                            onClick={handleLogout}
                                            to="#"
                                        >
                                            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Salir
                                        </Link>
                                    </ul>
                                </li>
                            </ul>




                        </ul>
                        {/* <form className="d-flex ">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="button">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>





        </>
    )
}
