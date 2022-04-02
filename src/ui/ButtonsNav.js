import React from 'react'
import { useNavigate } from 'react-router-dom'

export const ButtonsNav = React.memo(() => {
    const navigate = useNavigate()
    return (
        <div className='row mb-3'>
            <div className='col'>
                <button
                    className='btn'
                    onClick={() => navigate(-1)}
                >
                    <i className="far fa-arrow-alt-circle-left h2 text-success"></i>
                </button>
            </div>

            <div className='col d-flex justify-content-end'>
                <button
                    className='btn'
                    onClick={() => navigate(1)}
                >
                    <i className="far fa-arrow-alt-circle-right h2 text-success"></i>
                </button>
            </div>
        </div>
    )
})
