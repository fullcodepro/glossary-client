import React, { useContext, useEffect, useState }/*,  { useContext, useEffect, useMemo, useState } */ from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { URL } from '../../configs/envs';
import { GlossaryContext } from '../context/GlossaryContext';
import queryString from 'query-string';
import { getWordById } from '../../selectors/getWordById';

export const EditGlossaryScreen = () => {
  const { glossary, editWord } = useContext(GlossaryContext)
  const navigate = useNavigate();

  // Se obtiene el id que viene se encuentra en el parámetro de consulta
  const location = useLocation();
  const { q } = queryString.parse(location.search)


  const [wordSelected, setWordSelected] = useState({
    categoryId: '',
    definition: '',
    wordName: '',
    _id: '',
    valueDefault: '',
    textDefault: '',
  });

  const {
    definition,
    wordName,
    _id,
    categoryId,
    valueDefault,
    textDefault
  } = wordSelected;

  useEffect(() => {
    const data = getWordById(glossary, q);
    const wordFounded = {}
    wordFounded.valueDefault = data.categoryId[0]._id;
    wordFounded.textDefault = data.categoryId[0].name;
    wordFounded.categoryId = data.categoryId[0]._id;
    wordFounded.definition = data.definition;
    wordFounded.wordName = data.wordName;
    wordFounded._id = data._id
    console.log(wordFounded)
    setWordSelected(wordFounded)
  }, []);


  // Manejo de cambio de los inputs
  const handleInputChange = ({ target }) => {
    if (target.name === 'definition' && target.value.length === 200) {
      return alert(`Límite de caracteres alcanzado: ${target.value.length}`)
    }

    setWordSelected({
      ...wordSelected,
      [target.name]: target.value
    })

  };

  // Envío de los datos
  const handleSubmit = (e) => {
    e.preventDefault();

    (
      async () => {
        const resp = await fetch(`${URL}/api/word/${_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token'),
          },
          body: JSON.stringify(wordSelected)

        })

        const data = await resp.json()

        if (!resp.ok) {
          navigate('/')
          return alert(data.msg)
        }

        editWord(data.wordUpdated)
        navigate('/')
        return alert(data.msg)
      })();
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
            {/* CATEGORIA */}
            <div className="mb-3">
              <label htmlFor="disabledSelect" className="form-label">Seleccione una categoría</label>
              <select
                id="disabledSelect"
                className="form-select"
                name="categoryId"
                value={categoryId}
                onChange={handleInputChange}
              >
                <option disabled value={valueDefault}>{textDefault}</option>
                <option value="6249d495d7dd11bdb775462b">redes</option>
                <option value="6249d4ce9bff4f4f406952d0">estadística</option>
                <option value="6249d4ea9bff4f4f406952d2">seminario-actualizacion</option>
                <option value="6249d4fd9bff4f4f406952d4">proyecto-integracion</option>
                <option value="6249d5789bff4f4f406952d6">cibersecurity-fundamentals</option>
                <option value="6249d3b6d7dd11bdb7754629">ciberseguridad</option>
              </select>
            </div>

            {/* TITULO DE PALABRA */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Palabra:</label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Ej: cibersecurity"
                name='wordName'
                value={wordName}
                onChange={handleInputChange}
              />
            </div>

            {/* DEFINICION DE PALABRA */}
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Definición:</label>
              <textarea
                className="form-control"
                placeholder='200 caracteres máximo'
                id="exampleFormControlTextarea1"
                rows="3"
                maxLength={200}
                name='definition'
                value={definition}
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
