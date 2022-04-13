import React/*,  { useContext, useEffect, useMemo, useState } */ from 'react'
// import { useLocation, useNavigate } from 'react-router-dom';
// import { URL } from '../../configs/envs';
// import { glossaryTypes } from '../../types/glossaryTypes';
// import { GlossaryContext } from '../context/GlossaryContext';
// import queryString from 'query-string';
// import { getWordById } from '../../selectors/getWordById';

// const headers = {
//   'Content-Type': 'application/json',
// };

export const EditGlossaryScreen = () => {

  // const navigate = useNavigate();
  // const location = useLocation();
  // const { q } = queryString.parse(location.search)


  
  const handleInputChange = ({ target }) => {
    if (target.name === 'definition' && target.value.length === 200) {
      return alert(`Límite de caracteres alcanzado: ${target.value.length}`)
    }
    
  };


  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col'>
          <h1 className='text-center text-light bg-dark bg-gradient shadow-hover rounded p-2'>
            Editar palabra
          </h1>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <form
            onSubmit={handleSubmit}
            className='pt-3'
          >

            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">Seleccione una categoría</label>
              <select
                id="disabledSelect"
                className="form-select"
                name="categoryId"
                value=""
                onChange={handleInputChange}
              >
                <option defaultChecked disabled value={(Math.floor(Math.random() * (100, 1) - 1)).toString()}>Seleccione una opción</option>
               
              </select>

            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Palabra:</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ej: cibersecurity"
                name='wordName'
                value=""
                onChange={handleInputChange}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Definición:</label>
              <textarea
                className="form-control"
                placeholder='200 caracteres máximo'
                id="exampleFormControlTextarea1"
                rows="3"
                maxLength={200}
                name='definition'
                value=""
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className='input-group mb-3 d-flex'>
              <button
                className='btn btn-md btn-success shadow-hover mx-2'
                type='submit'
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
