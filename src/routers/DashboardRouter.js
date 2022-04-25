import React, { useContext } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { AddCategory } from "../components/admin/AddCategory";
import { EditGlossaryScreen } from "../components/glossary/EditGlossaryScreen";
import { GlossaryHomeScreen } from "../components/glossary/GlossaryHomeScreen";
import { NewGlossaryScreen } from "../components/glossary/NewGlossaryScreen";
import { Footer } from "../ui/Footer";
import { NavBar } from "../ui/NavBar";
import '../components/css/sidebar-links.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faHome, faLink } from "@fortawesome/free-solid-svg-icons";
import { UserProfileScreen } from "../components/profile/UserProfileScreen";
import { SocketContext } from "../hooks/SocketContext";

export const DashboardRouter = () => {
  const { online } = useContext(SocketContext);


  return (
    <>
      <NavBar />
      <div className="row vh-100">

        {/* COL 1 - BARRA LATERAL */}
        <div className='col-3 col-lg-2 border col-md-4 col-sm-12 col-lg-2 text-center sidebar rounded p-0'>
          <div className="bg-primary text-light mb-4 py-2 rounded w-100">

            <div className="bg-dark border"
              style={{ opacity: 0.8, fontSize: 20, width: 60, height: 60, borderRadius: "60px", display: "inline-block" }}
            >
              <div className='d-flex justify-content-center align-items-center'>
                <FontAwesomeIcon className="mt-3 border-bottom pb-2" icon={faHome} />
              </div>
            </div>



          </div>
            <p>
              <strong>Estado: </strong>
              {
                online
                  ? <span className="badge rounded-pill bg-success p-2"> Conectado</span>
                  : <span className="badge rounded-pill bg-danger p-2"> Desconectado</span>
              }
            </p>

          <ul className="navbar-nav">

            <NavLink
              // className="ligt-group-item p-2 mb-3 w-100 sidebar-link rounded"
              className={({ isActive }) => `text-dark nav-link nav-item w-100 sidebar-link rounded mb-1 ${(isActive && 'active selected-item')}`}
              to="/"
            >
              <FontAwesomeIcon icon={faHome} /> Inicio
            </NavLink>


            <NavLink
              className={({ isActive }) => `text-dark nav-link nav-item w-100 sidebar-link rounded mb-1 ${(isActive && 'active selected-item')}`}

              to="/category/add"
            >
              <FontAwesomeIcon icon={faBook} /> Categorías
            </NavLink>

            <NavLink
              className={({ isActive }) => `text-dark nav-link nav-item w-100 sidebar-link rounded mb-1 ${(isActive && 'active selected-item')}`}

              to="/home"
            >
              <FontAwesomeIcon icon={faLink} /> Item
            </NavLink>


          </ul>



        </div>

        {/* COLUMNA 2 - MAIN CONTENT */}
        <div className='col'>
          <Routes>
            <Route path="/home" element={<GlossaryHomeScreen />} />
            <Route path="/new" element={<NewGlossaryScreen />} />
            <Route path="/edit" element={<EditGlossaryScreen />} />
            <Route path="/category/add" element={<AddCategory />} />
            <Route path="/user/profile/:id" element={<UserProfileScreen />} />


            {/* <Route path="/edit/:id" element={<EditarInventarioScreen />} /> */}

            <Route path="/" element={<GlossaryHomeScreen />} />
          </Routes>


        </div>
      </div>


      {/* SEGUNDA FILA - FOOTER */}
      <div className="row bg-dark rounded">

        <div className='col'>
          <Footer />
        </div>
      </div>
    </>
  );
};
