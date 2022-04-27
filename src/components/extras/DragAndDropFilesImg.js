import React, { useState } from 'react';
import '../css/drag_and_drop_img.css';
export const DragAndDropFiles = () => {

    const [files, setFiles] = useState([]);

    const handleInputFileChange = (e) => {

        // Crear lector de archivo
        const reader = new FileReader();
        for (let i = 0; i < e.target.files.length; i++){
            reader.readAsDataURL(e.target.files[i])
            reader.onload = (e) => {
                e.preventDefault();
                const { result } = e.target;
                
                console.log(result)
                setFiles([...files, result]);
            }

        }
    };
    
    // Abrir input file 
    const handleShowINput = (e) => {
        e.preventDefault();
        document.getElementById('clicleame').click();
    };

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col'>
                    <div className="drop-area">
                        <h2>Arrastra y suelta imágenes</h2>
                        <span>{ files.length || 0 }</span>
                        <button
                            className='input-file'
                            onClick={handleShowINput}
                        >
                            Selecciona tus archivos
                        </button>

                        <div className="mb-3">
                            <input
                                className="btn btn-primary"
                                type="file"
                                accept="image/*"
                                id="clicleame"
                                hidden
                                multiple
                                onChange={handleInputFileChange}
                            />
                        </div>
                        <div id="preview" className='mt-2 d-flex flex-row w-100'>
                            {
                            (files)
                            ?
                            files.map( (file, i) =>(
                                <div 
                                key={i}
                                className='mx-2'>
                                    <img src={file} alt="" width={100} />
                                </div>
                            ))
                            :
                            <div className='py-2'>
                                <p>NO HAY IMAGENES</p>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
