import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "./styles/globals.css";
import { Header } from "./components/Header";
import { Home } from "./pages/Home/index";
import { Cardapio } from "./pages/Cardapio/Cardapio";
import { Cozinha } from "./pages/Cozinha";
import { FaleConosco } from "./pages/FaleConosco";
import Pedidos from "./pages/Pedidos/indes";
import { HeaderPedidos } from "./components/HeaderPedidos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContent = () => {
  const location = useLocation();

  // Verificar se a rota atual é "/pedidos" ou "/faleConosco"
  const isPedidosOrFaleConosco =
    location.pathname === "/pedidos" || location.pathname === "/faleConosco";

  return (
    <div className="App">
      {/* Condicionalmente renderize o HeaderPedidos para /pedidos ou /faleConosco */}
      {isPedidosOrFaleConosco ? <HeaderPedidos /> : <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/cozinha" element={<Cozinha />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/faleConosco" element={<FaleConosco />} />
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
