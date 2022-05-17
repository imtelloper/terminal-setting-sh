import "./styles/Common.scss";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Layout from "./components/layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/*" element={<Main />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
