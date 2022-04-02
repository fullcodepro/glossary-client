import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../hooks/useForm';
import { URL } from '../configs/envs';
// import { useNavigate } from 'react-router-dom';


export const ModalNewInventory = () => {

  // const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    reset();
    setShow(false)
  };

  const handleShow = () => setShow(true);

  const [formFile, setFormFile] = useState();

  const [values, handleInputChange, reset] = useForm({
    brand: '',
    specs: '',
    color: '',
    comments: '',
    equipment_type: '',
    inventory_number: '',
    model: '',
    sector: '',
  });

  // Desestructuración de los valores del formulario
  const {
    brand,
    specs,
    color,
    comments,
    equipment_type,
    inventory_number,
    model,
    sector
  } = values;

  // Envío de los datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      brand?.trim().length === 0 ||
      specs?.trim().length === 0 ||
      color?.trim().length === 0 ||
      comments?.trim().length === 0 ||
      equipment_type?.trim().length === 0 ||
      inventory_number?.trim().length === 0 ||
      model?.trim().length === 0 ||
      sector?.trim().length === 0 ||
      !formFile
    ) {
      alert('Todos los campos son necesarios!')
      return;
    } else {
      const formData = new FormData();

      formData.append('file', formFile)
      formData.append('brand', brand)
      formData.append('specs', specs)
      formData.append('color', color)
      formData.append('comments', comments)
      formData.append('equipment_type', equipment_type)
      formData.append('inventory_number', inventory_number)
      formData.append('model', model)
      formData.append('sector', sector)

      const resp = await fetch(`${URL}/inventarios/new`, {
        method: 'POST',
        body: formData,
        headers: {
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDc4ODUyNzc5ZWVmYTJhZTQ1YjZhZjEiLCJpYXQiOjE2NDE2OTMwMDcsImV4cCI6MTY0MTcwNzQwN30.wT4gSK0ALCHzc-DfyMxiCgVJU1IiyKtFvJKXjXoMvQc'
        }
      })

      const { msg } = await resp.json();

      if (resp.ok) {
        alert(msg);
      }

      if (!resp.ok) {
        alert(msg)
      }

      handleClose();

      // navigate('/')

      console.log('SUBMIT!!!')
    }
  }

  const handleSetFile = ({ target }) => {
    setFormFile(target.files[0]);
  }


  return (
    <div>
      <Button variant="primary" className='far fa-edit p-1' onClick={handleShow}>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>NUEVO REGISTRO</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form
            onSubmit={handleSubmit}
          >

            {/* NRO DE INVENTARIO */}
            <Form.Group className='mb-2' as={Col} controlId="formGridNroInventory">
              <Form.Label>Nro. de Inventario:</Form.Label>
              <Form.Control type='text' 
                onChange={handleInputChange}
                name='inventory_number'
                value={inventory_number}
              />
            </Form.Group>

            {/* SECTOR */}
            <Form.Group className='mb-2' as={Col} controlId="formGridBrand">
              <Form.Label>Marca:</Form.Label>
              <Form.Control type='text' 
                onChange={handleInputChange}
                name='brand'
                value={brand}
              />
            </Form.Group>

            {/* TIPO EQUIPAMIENTO */}
            <Form.Group className='mb-2' as={Col} controlId="formGridTypeOfEquipment">
              <Form.Label>Tipo de Equipamiento:</Form.Label>
              <Form.Control type='text' 
                onChange={handleInputChange}
                name='equipment_type'
                value={equipment_type}
              />
            </Form.Group>

            {/* ROW */}
            <Row className='mb-2'>
              {/* MODELO */}
              <Form.Group as={Col} controlId="formGridModel">
                <Form.Label>Modelo:</Form.Label>
                <Form.Control type='text' 
                  onChange={handleInputChange}
                  name='model'
                  value={model}
                />
              </Form.Group>

              {/* COLOR */}
              <Form.Group as={Col} controlId="formGridColor">
                <Form.Label>Color:</Form.Label>
                <Form.Control type='text' 
                  onChange={handleInputChange}
                  name='color'
                  value={color}
                />
              </Form.Group>
            </Row>

            {/* COMENTARIOS */}
            <Form.Group className='mb-2' as={Col} controlId="formGridColor">
              <Form.Label>Comentarios:</Form.Label>
              <Form.Control type='text' 
                onChange={handleInputChange}
                name='comments'
                value={comments}
              />
            </Form.Group>

            {/* FOTO DEL EQUIPO */}

            <Form.Group controlId="formFile" className="mb-">
              <Form.Label>Foto del equipo:</Form.Label>
              <Form.Control type="file" 
                onChange={handleSetFile}
                name='file'
              />
            </Form.Group>


            <Row>
              <Form.Group
                as={Col}
                className='d-flex justify-content-end mt-4'
              >
                <Button
                  variant="outline-danger"
                  onClick={handleClose}
                  className='mx-2'
                >
                  Cancelar
                </Button>
                <Button type='submit' variant="primary">Guardar</Button>
              </Form.Group>


            </Row>

          </Form>

        </Modal.Body>
      </Modal>
    </div>
  );
}