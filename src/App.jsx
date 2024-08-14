import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./styles/globals.css";
import { Header } from "./components/Header";
import { Home } from "./pages/Home/index";
import { Cardapio } from "./pages/Cardapio/Cardapio";
import { Cozinha } from "./pages/Cozinha";
import Pedidos from "./pages/Pedidos/indes";
import { HeaderPedidos } from "./components/HeaderPedidos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="App">
      {/* Condicionalmente renderize o Header */}
      {location.pathname !== "/pedidos" ? <Header /> : <HeaderPedidos />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/cozinha" element={<Cozinha />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
      <ToastContainer />
    </Router>
  );
}

export default App;
