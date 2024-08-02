import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export const Header = () => {
  return (
    <header className="App-header">
      <Link to="/">
        <img src={"/images/logo2.png"} className="App-logo" alt="logo" />
      </Link>
      <nav className="App-nav">
        <Link to="/">INÍCIO</Link>
        <Link to="/cardapio">CARDÁPIO</Link>
        <Link to="/cozinha">COZINHA</Link>
        <Link to="/pedidos" className="App-button">
          Fazer Pedido
        </Link>
      </nav>
    </header>
  );
};
