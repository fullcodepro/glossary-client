import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import '../../components/css/AddCategory.css';
export const AddCategory = () => {

    // const navigate = useNavigate();
    
    // TODAS LAS CATEGORÍAS PROVENIENTES DE LA BD
    const [allCategories, setallCategories] = useState([]);
    
    // FORMULARIO DE LA VISTA
    const [category, setCategory] = useState({
        name: ''
    });
    const { name } = category;

    // PERMITE CONTROLAR FORMULARIO PARA EDITAR
    const [showEdit, setShowEdit] = useState({
        show: false,
        id: ''
    });

    // REALIZA LA PETICIÓN PARA OBTENER TODAS LAS CATEGORÍAS
    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://127.0.0.1:5000/api/category/', {
                    'Content-Type': 'application/json',
                    headers: {
                        'authorization': localStorage.getItem('token'),
                    }
                })
                const data = await response.json();

                if (!response.ok) {
                    return alert("No se han podido cargar las categorías")
                }

                setallCategories(data.entries)
            }
        )();
    }, [])

    // CAPTURA LOS VALORES INGRESADOS EN LA CAJA DE TEXTO
    const handleInputChange = ({ target }) => {
        setCategory({
            ...category,
            [target.name]: target.value
        });
    };

    // ENVÍA LOS DATOS AL SERVIDOR
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category || category.name.length < 1) {
            return alert('No se puede crear categoría sin nombre')
        }

        const response = await fetch('http://127.0.0.1:5000/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(category)
        })
        const data = await response.json();

        if (!response.ok) {
            setCategory({ name: '' });
            return alert(data.error.message);
        };


        // navigate('/home');
        setallCategories([...allCategories, data.entry]);
        return alert(data.message)
    };

    // ELIMINAR UNA CATEGORÍA
    const deleteCategory = async (id) => {

        if (!id) {
            return alert("No hay id en el botón")
        }

        const response = await fetch(`http://127.0.0.1:5000/api/category/${id}`, {
            method: 'DELETE',
            'Content-Type': 'application/json',
            headers: {
                'authorization': localStorage.getItem('token'),
            }
        })

        const data = await response.json();

        if (!response.ok) {
            return alert(data.error.message)
        };


        const result = allCategories.filter(cat => cat._id !== id);
        console.log({ result })
        setallCategories(result)
        alert(data.message)
    };


    // MUESTRA LOS CONTROLES PARA EDITAR Y CAPTURA EL ID DE LA CAT QUE SE EDITARÁ
    const editCategory = (id, categoryName) => {
        setCategory({
            ...category,
            name: categoryName
        })
        setShowEdit({
            show: true,
            id
        })
    }

    // SE ENVÍAN LOS DATOS PARA ACTUALIZAR
    const handleEditCategory = async (e) => {

        e.preventDefault();
        const response = await fetch(`http://127.0.0.1:5000/api/category/${showEdit.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ name })
        })
        const data = await response.json();

        if (!response.ok) {
            setShowEdit({ id: '', show: false });
            return alert(data.error.message);
        };

        alert(data.message)
        setallCategories(() => allCategories.filter(cat => { if (cat._id === showEdit.id) { cat.name = name } return cat }));
        setCategory({ name: "" })
        setShowEdit({
            ...showEdit,
            show: false
        })
    }

    return (
        <>
            <div className='container'>
                <h1 className='text-center shadow py-3'>CATEGORÍAS DE CONCEPTOS</h1>

                <div className='row mx-auto mt-4 p-3 shadow'>
                    {/* AGREGAR NUEVA CATEGORÍA */}
                    <div className='col-md-6'>
                        <h5 className="text-center">
                            {
                                (!showEdit.show)
                                    ? "AGREGAR NUEVA"
                                    : "EDITAR"}
                        </h5>
                        <form>
                            <div className='form-group mb-3'>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Ej: Física'
                                    autoComplete='off'
                                    name="name"
                                    value={name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='form-group mb-3'>
                                {
                                    (!showEdit.show)
                                        ?
                                        (
                                            <button
                                                type='submit'
                                                className='btn btn-success bg-gradient shadow-hover'
                                                onClick={handleSubmit}
                                            >
                                                Guardar
                                            </button>
                                        )
                                        :
                                        (
                                            <>
                                                <button
                                                    type='button'
                                                    className='btn btn-md btn-outline-primary bg-gradient shadow-hover mx-2'
                                                    onClick={handleEditCategory}
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    type='button'
                                                    className='btn btn-md btn-secondary bg-gradient shadow-hover'
                                                    onClick={() => setShowEdit({ ...showEdit, show: false })}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        )
                                }
                            </div>

                        </form>
                    </div>


                    {/* LISTADO CATEGORÍAS EXISTENTES */}
                    <div className='col'>
                        <h5 className="text-center">EXISTENTES</h5>
                        <div className=''>
                            <ul className='list-group ouverflow'>
                                {
                                    (allCategories.length < 1)
                                        ?
                                        (
                                            <li className='p-3 bg-info'>
                                                <p className='text-center text-light'>No Hay categorías para mostrar </p>
                                            </li>
                                        )
                                        :
                                        (
                                            allCategories.map(({ name, _id }) => (
                                                <li key={_id}
                                                    className='d-flex justify-content-between align-items-center list-group-item py-3'
                                                >
                                                    <p
                                                        className=''
                                                        onClick={() => editCategory(_id, name)}
                                                    >{name}</p>
                                                    <div>
                                                        <button
                                                            className='btn btn-sm btn-danger bg-gradient shadow-hover'
                                                            onClick={() => deleteCategory(_id)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </li>
                                            ))
                                        )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
