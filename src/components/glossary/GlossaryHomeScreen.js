import React, { useEffect, useState } from 'react'

export const GlossaryHomeScreen = () => {

  const [words, setWords] = useState([]);


  const handleInputChange = ({ target }) => {
    const word = target.value;

    (async () => {
      const response = await fetch(`http://localhost:5000/api/word/${word}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()
      setWords(data);
    })();

  }

  useEffect(() => {
    (async () => {

      const response = await fetch('http://localhost:5000/api/word/', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      console.log(data)
      setWords(data);
    })();
  }, []);

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
        (!words)
          ? (<p className='text-center'>{'Loading...'}</p>)
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
                          onChange={handleInputChange}
                          placeholder='Ingrese una palabra'
                          type='text'
                        />
                       </div>
                     
                        <div className='col'>
                          <button className='btn btn-md btn-success bg-gradient shadow'>
                            Search
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
                        words.map(word => (
                          <tr key={word.id}>
                            <td className='text-center'>{word.name}</td>
                            <td>{word.definition}</td>
                            <td>
                              <div className='d-flex'>
                                <button
                                  className='d-inline btn bg-gradient shadow-hover btn-sm btn-warning mx-1'
                                >
                                  Editar
                                </button>
                                <button
                                  className='btn btn-sm bg-gradient shadow-hover btn-danger'
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
