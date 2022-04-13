import React, { /* useContext, useEffect, */ useState } from 'react';

export const Search = (() => {

    const [search, setSearch] = useState('');


    const handleSearchChange = ({ target }) => {
        const str = target.value;
        setSearch(str);
    }

    const searchSubmit = (e) => {
        e.preventDefault();
        if (search.length < 1) return;

        console.log(search);
    };



    return (
        <>
            <form className=''
                onSubmit={searchSubmit}
            >
                <div className='d-flex justify-content-center align-items-center row'>

                    <div className='col'>
                        <input
                            autoComplete='off'
                            className='form-control'
                            placeholder='Ingrese una búsqueda'
                            name='search'
                            type='text'
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className='col'>
                        <button
                            type='submit'
                            className='btn btn-md btn-success bg-gradient shadow'>
                            Buscar
                        </button>
                    </div>

                </div>
            </form>
        </>
    )


});
