import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlossaryContext } from '../context/GlossaryContext';
import { URL } from '../../configs/envs';
// import Spinner2 from '../Spinner2';
import { Search } from './Search';

const headers = {
  'Content-Type': 'application/json',
};

export const GlossaryHomeScreen = () => {
  const navigate = useNavigate();
  const { glossary, removeWord } = useContext(GlossaryContext)

  const handleEdit = (id) => navigate(`/edit/?q=${id}`);

  const handleDelete = (id) => {
    (async () => {

      headers.authorization = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/word/${id}`, {
        method: 'DELETE',
        headers
      });

      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        removeWord(id);
        return alert(data.msg);
      }
      removeWord(id);
      console.log("el id recibido es ", id)
      navigate('/home');
      alert(data.msg)
    })();
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
          ? (
          // <Spinner2 />
          <h3 className='text-center mt-4'> No hay resultados que mostrar</h3>
          )
          // : ( JSON.stringify(words, null, 3) )
          : (
            <>
              <div className=' row mt-4 mb-3'>
                <Search glossary={glossary} />
              </div>

              <div className='row'>
                <div className='col'>
                  <table className='table table-bordered table-hover border'>
                    <thead className='bg-dark bg-gradient text-center text-light shadow-hover'>
                      <tr>
                        <th>Palabra</th>
                        <th>Definición</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {
                        glossary?.map((word, i) => (
                          <tr key={i}>
                            <td className='text-center'>{word.wordName}</td>

                            <td
                              aria-multiline="true"
                            >
                              {word.definition}
                            </td>

                            <td>{word.categoryId[0]?.name || word.categoryId || "Sin categoría"}</td>

                            <td >
                              <div className="d-flex justify-content-center">
                                <button
                                  className='btn bg-gradient shadow-hover btn-sm btn-warning mx-1'
                                  onClick={() => handleEdit(word._id)}
                                >
                                  Editar
                                </button>
                                <button
                                  className='btn btn-sm bg-gradient shadow-hover btn-danger'
                                  onClick={() => handleDelete(word._id)}
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
