import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlossaryContext } from '../context/GlossaryContext';
import { glossaryTypes } from '../../types/glossaryTypes';
import { URL } from '../../configs/envs';
import Spinner2 from '../Spinner2';

const headers = {
  'Content-Type': 'application/json',
};

export const GlossaryHomeScreen = () => {
  const navigate = useNavigate();
  const { glossary, dispatchGlossary } = useContext(GlossaryContext)

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  }

  const handleDelete = async (id) => {
    headers.authorization = localStorage.getItem('token');
    const response = await fetch(`${URL}/api/word/${id}`, {
      method: 'DELETE',
      headers
    });

    const { msg } = await response.json();
    if (!response.ok) return alert(msg);

    dispatchGlossary({
      type: glossaryTypes.deleteWord,
      payload: id
    })
    navigate('/');
    return alert(msg)
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <header>
            <h1 className=' rounded bg-dark bg-gradient shadow-hover text-light text-center py-3 mt-4'>Glosario de términos de Ciberseguridad</h1>
          </header>
        </div>
      </div>
      {
        (glossary?.length < 1)
          ? (<Spinner2 />)
          // : ( JSON.stringify(words, null, 3) )
          : (
            <>
              <div className=' row mt-4 mb-3'>
                <form className=''>
                  <div className='d-flex justify-content-center align-items-center row'>

                    <div className='col'>
                      <input
                        autoComplete='off'
                        className='form-control'
                        placeholder='Ingrese una palabra'
                        type='text'
                      />
                    </div>

                    <div className='col'>
                      <button
                        className='btn btn-md btn-success bg-gradient shadow'>
                        Buscar
                      </button>
                    </div>

                  </div>
                </form>
              </div>

              <div className='row'>
                <div className='col'>
                  <table className='table table-bordered table-hover border'>
                    <thead className='bg-dark bg-gradient text-center text-light shadow-hover'>
                      <tr>
                        <th>Palabra</th>
                        <th>Definición</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        glossary.map((word, i) => (
                          <tr key={i}>
                            <td className='text-center'>{word.wordName}</td>
                            <td
                              aria-multiline="true"
                            >{word.definition}</td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  className='d-inline btn bg-gradient shadow-hover btn-sm btn-warning mx-1'
                                  onClick={() => handleEdit(word.id)}
                                >
                                  Editar
                                </button>
                                <button
                                  className='btn btn-sm bg-gradient shadow-hover btn-danger'
                                  onClick={() => handleDelete(word.id)}
                                >
                                  Eliminar
                                </button>

                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )
      }
    </div>
  )
}
