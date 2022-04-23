import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { AddCategory } from "../components/admin/AddCategory";
import { EditGlossaryScreen } from "../components/glossary/EditGlossaryScreen";
import { GlossaryHomeScreen } from "../components/glossary/GlossaryHomeScreen";
import { NewGlossaryScreen } from "../components/glossary/NewGlossaryScreen";
import { Footer } from "../ui/Footer";
import { NavBar } from "../ui/NavBar";
import '../components/css/sidebar-links.css';

export const DashboardRouter = () => {
  return (
    <>
      <NavBar />
      <div className="row vh-100 p-0 mt-3">

        {/* COL 1 - BARRA LATERAL */}
        <div className='col-3 ms-3 col-lg-2 text-center sidebar mt-3 rounded boder vh-100 shadow'>


          <p className="bg-primary text-light h5 mt-2 mb-4 p-2 rounded">MÁS SECCIONES</p>

          <ul className="navbar-nav">
            <NavLink
              // className="ligt-group-item p-2 mb-3 w-100 sidebar-link rounded"
              className={({ isActive }) => `text-dark nav-link nav-item w-100 sidebar-link rounded mb-1 ${(isActive && 'active selected-item')}`}
              to="/"
            >
              Inicio
            </NavLink>

            <NavLink
              // className="ligt-group-item p-2 mb-3 w-100 sidebar-link rounded"
              className={({ isActive }) => `text-dark nav-link nav-item w-100 sidebar-link rounded mb-1 ${(isActive && 'active selected-item')}`}

              to="/category/add"
            >
              categorías
            </NavLink>
          </ul>



        </div>

        {/* COLUMNA 2 - MAIN CONTENT */}
        <div className='col mt-3'>
          <Routes>
            <Route path="/home" element={<GlossaryHomeScreen />} />
            <Route path="/new" element={<NewGlossaryScreen />} />
            <Route path="/edit" element={<EditGlossaryScreen />} />
            <Route path="/category/add" element={<AddCategory />} />

            {/* <Route path="/edit/:id" element={<EditarInventarioScreen />} /> */}

            <Route path="/" element={<GlossaryHomeScreen />} />
          </Routes>


        </div>

        {/* SEGUNDA FILA - FOOTER */}
        <div className="row w-100 bg-dark rounded mt-2">
          <div className="col-3 col-lg-2 mt-3">

          </div>
          <div className='col'>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
