import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { GlossaryContext } from '../context/GlossaryContext';
import { URL } from '../../configs/envs';
// import Spinner2 from '../Spinner2';
import { Search } from './Search';

import backgroundImage from './image_back.jpg';
import { ChatScreen } from '../chat/ChatScreen';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

const headers = {
  'Content-Type': 'application/json',
};

export const GlossaryHomeScreen = () => {
  const navigate = useNavigate();
  const { glossary, removeWord } = useContext(GlossaryContext)

  // EDITAR PALABRA
  const handleEdit = (id) => navigate(`/edit/?q=${id}`);

  // ELIMINAR PALABRA
  const handleDelete = (id) => {
    (async () => {

      headers.authorization = localStorage.getItem('token');
      const response = await fetch(`${URL}/api/word/${id}`, {
        method: 'DELETE',
        headers
      });

      const data = await response.json();
      if (!response.ok) {
        return alert(data.msg);
      }
      removeWord(id);
      navigate('/home');
      alert(data.msg)
    })();
  };


  return (
    <div className=''>
      <div className='row'>
        <div className='col col-lg-9 col-md-10 col-sm-12 mx-auto mb-4'>
          <header>
            <h1 className='rounded text-dark text-center mt-3'>GLOSARIO DE TÉRMINOS</h1>
          </header>
        </div>


      </div>
      {
        (glossary?.length < 1)
          ?
          (
            // <Spinner2 />
            <>
              <div className=' d-flex flex-column justify-content-center align-items-center'>
                <h3 className='text-center'> Empieza a agregar conceptos!</h3>
                <img src={backgroundImage} width={600} className="shadow shadow-3 shadow-hover" alt='No hay palabras para mostrar' />
              </div>
            </>
          )
          :
          (
            <>

              <div className='row'>
                <div className='col col-lg-11 col-md-8 col-sm-12 mx-auto'>
                  <div className=' row mb-3  pb-1'>
                    <Search glossary={glossary} />
                  </div>
                  <table className='table table-bordered text-center table-hover border'>
                    <thead className='bg-dark text-light shadow-hover'>
                      <tr>
                        <th>Palabra</th>
                        <th>Definición</th>
                        <th>Categoría</th>
                        <th>Creado por</th>
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
                            <td>{word.createdFor?.firstName}</td>
                            <td >
                              <div className="d-flex justify-content-center">
                                <button
                                  className='btn btn-sm btn-warning mx-1'
                                  onClick={() => handleEdit(word._id)}
                                >
                                  <FontAwesomeIcon icon={faEdit} />

                                </button>
                                <button
                                  className='btn btn-sm btn-danger'
                                  onClick={() => handleDelete(word._id)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
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
      <ChatScreen />
    </div>
  )
}
