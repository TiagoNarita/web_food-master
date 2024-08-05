import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import "./styles.css";

export const HeaderPedidos = () => {
  return (
    <div className="headerContain">
      <div className="navContainer">
        <Link to="/" className="navLink">
          <button className="navButton">
            <HomeIcon />
            <span>Início</span>
          </button>
        </Link>
        <Link to="/promocoes" className="navLink">
          <button className="navButton">
            <LocalOfferIcon />
            <span>Promoções</span>
          </button>
        </Link>
        <Link to="/pedidos" className="navLink">
          <button className="navButton">
            <ShoppingCartIcon />
            <span>Pedidos</span>
          </button>
        </Link>
        <Link to="/entrar" className="navLink">
          <button className="navButton">
            <PersonIcon />
            <span>Entrar/Cadastrar</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
