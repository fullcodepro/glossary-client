import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { URL } from '../../configs/envs';
import { useForm } from '../../hooks/useForm'
import { types } from '../../types/types';
import { AuthContext } from '../context/AuthContext';
// import './login.css'
export const LoginScreen = () => {

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState({
        active: false,
        msg: ''
    })

    const { active, msg } = error;

    const [values, handleInputChange, reset] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = values;


    const handleLogin = (e) => {
        e.preventDefault()

        if
            (
            email.trim().lenght === 0 ||
            password.trim().lenght === 0
        ) {
            alert('Todos los campos son necesarios.');
            return;
        }

        fetch(`${URL}/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username:email, password })
        })
            .then(async resp => {

                const { ok } = resp;

                if (!ok) {
                    const { msg } = await resp.json();
                    setError({
                        active: true,
                        msg
                    })
                    return;
                }
                const { token, user } = await resp.json();

                alert('Bienvenido al sistema');

                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
                reset();

                dispatch({
                    types: types.login,
                    payload: {  ...user }
                });

                const lastPath = localStorage.getItem('lastPath') || '/';

                navigate(lastPath, {
                    replace: true
                })


            })

    }

    return (
        <div className='container mt-5 '>
            <div className='row rounded'>
                <div className='col-lg-5 m-auto mt-5 align-items-center col-md-7 col-sm-10 col-xs-12'>
                    <div className='card p-2 shadow'>
                        {
                            (active) &&
                            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                <div className='row'>
                                    <strong>{msg}</strong>
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                                        onClick={() => setError({ ...error, active: !active })}
                                    ></button>
                                </div>
                            </div>

                        }
                        <div className='card-title mb-3'>
                            <h1 className='text-center bg-dark bg-gradient shadow-hover p-2 text-light'>Login</h1>
                        </div>
                        <div className='card-body'>
                            <form
                                onSubmit={handleLogin}
                            >
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Usuario:</label>
                                    <input
                                        type="email"
                                        name='email'
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        onChange={handleInputChange}
                                        value={email}
                                    />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña:</label>
                                    <input
                                        type="password"
                                        name='password'
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        onChange={handleInputChange}
                                        value={password}
                                    />
                                </div>

                                <div className='form-group mt-4'>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        Ingresar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
