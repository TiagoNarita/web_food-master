import React from "react";
import "./App.css";
import "./styles/globals.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home/index";
import { Cardapio } from "./pages/Cardapio/Cardapio";
import { Cozinha } from "./pages/Cozinha";
import Pedidos from "./pages/Pedidos/indes";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/cozinha" element={<Cozinha />} />
          <Route path="/pedidos" element={<Pedidos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
