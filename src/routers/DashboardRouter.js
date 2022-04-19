import React from "react";
import { Route, Routes } from "react-router-dom";
import { EditGlossaryScreen } from "../components/glossary/EditGlossaryScreen";
import { GlossaryHomeScreen } from "../components/glossary/GlossaryHomeScreen";
import { NewGlossaryScreen } from "../components/glossary/NewGlossaryScreen";
import { Footer } from "../ui/Footer";
import { NavBar } from "../ui/NavBar";

export const DashboardRouter = () => {
  return (
    <>
      <NavBar />
      <div className="row vh-100">
        <div className='col-3 sidebar px-4 mt-4 rounded d-flex justify-content-center vh-100'>
          <div className="bg-dark shadow-hover bg-gradient rounded d-flex justify-content-center  w-100 h-100 text-white">
          <p className="text-center mt-4">BARRA LATERAL</p>
          </div>
        </div>
        <div className='col'>
          <Routes>
            <Route path="/home" element={<GlossaryHomeScreen />} />
            <Route path="/new" element={<NewGlossaryScreen />} />
            <Route path="/edit" element={<EditGlossaryScreen />} />
            {/* <Route path="/edit/:id" element={<EditarInventarioScreen />} /> */}

            <Route path="/" element={<GlossaryHomeScreen />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};
