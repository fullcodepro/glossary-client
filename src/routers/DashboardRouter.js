import React from "react";
import { Route, Routes } from "react-router-dom";
import { EditGlossaryScreen } from "../components/glossary/EditGlossaryScreen";
import { GlossaryHomeScreen } from "../components/glossary/GlossaryHomeScreen";
import { NewGlossaryScreen } from "../components/glossary/NewGlossaryScreen";
import { NavBar } from "../ui/NavBar";

export const DashboardRouter = () => {
  return (
    <>
      <NavBar />
      <div>
        <Routes>
          <Route path="/home" element={<GlossaryHomeScreen />} />
          <Route path="/new" element={<NewGlossaryScreen />} />
          <Route path="/edit" element={<EditGlossaryScreen />} />
          {/* <Route path="/edit/:id" element={<EditarInventarioScreen />} /> */}

          <Route path="/" element={<GlossaryHomeScreen />} />
        </Routes>
      </div>
    </>
  );
};
