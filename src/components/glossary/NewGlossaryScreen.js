import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { URL } from '../../configs/envs';
import { GlossaryContext } from '../context/GlossaryContext';

const headers = {
  'Content-Type': 'application/json',
};

export const NewGlossaryScreen = () => {

  const navigate = useNavigate();

  const { addWord } = useContext(GlossaryContext);

  const [categories, setCategories] = useState([]);
  const [newWord, setNewWord] = useState({
    wordName: '',
    definition: '',
    categoryId: ''
  });

  const { wordName, definition, categoryId } = newWord;

  // Se obtienen todas las categorías del back-end
  useEffect(() => {
    headers.authorization = localStorage.getItem('token');
    (async () => {
      const resp = await fetch(`${URL}/api/category`, { headers })
      const data = await resp.json();
      if (!resp.ok) {
        return alert(data.msg)
      }
      setCategories(data);
    })();
  }, []);


  // Estado de los datos nuevos a almacenar
  const handleInputChange = ({ target }) => {

    if (target.name === 'definition' && target.value.length === 200) {
      return alert(`Límite de caracteres alcanzado: ${target.value.length}`)
    }
    setNewWord({
      ...newWord,
      [target.name]: target.value
    })
  };


  // Se envían guardan los datos en la BD y luego se actualiza el context
  const handleSubmit = (e) => {
    e.preventDefault();
    headers.authorization = localStorage.getItem('token');

    (async () => {

      const response = await fetch(`${URL}/api/word/`, {
        method: 'POST',
        body: JSON.stringify(newWord),
        headers
      });

      let data = await response.json();

      if (
        !response.ok
      ) {
        return alert(data.msg);
      }

      addWord(data.word);

      headers.authorization = '';
      console.log(data.msg)
      return navigate('/')
    })()
  };

  return (
    <div className='container'>
      <div className='row mt-4'>
        <div className='col'>
          <h1 className='text-center text-light bg-dark bg-gradient shadow-hover rounded p-2'>
            Nueva Palabra
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
                value={categoryId}
                onChange={handleInputChange}
              >
                <option value={(Math.floor(Math.random() * (1000000, 1) - 1)).toString()}>Seleccione una opcion</option>
                {
                  (categories?.length > 0) &&
                  categories.map(category => (
                    <option
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  ))
                }
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
                value={wordName}
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
                value={definition}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className='input-group mb-3 d-flex'>
              <button
                className='btn btn-md btn-success shadow-hover mx-2'
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
