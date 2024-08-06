import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Modal from "react-modal";
import "./styles.css";

Modal.setAppElement("#root"); // Define o elemento base da aplicação para acessibilidade

export const HeaderPedidos = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    console.log("oi");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="headerContain">
      <div className="navContainer">
        <Link to="/" className="navLink">
          <button className="navButton">
            <HomeIcon />
            <span>Início</span>
          </button>
        </Link>
        <Link to="/pedidos" className="navLink">
          <button className="navButton">
            <ShoppingCartIcon />
            <span>Pedidos</span>
          </button>
        </Link>
        <Link to="/pedidos" className="navLink">
          <button className="navButton">
            <ShoppingCartIcon />
            <span>Fale conosco</span>
          </button>
        </Link>
        <button className="navButton" onClick={openModal}>
          <PersonIcon />
          <span>Entrar/Cadastrar</span>
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        className="modalContent"
        overlayClassName="modalOverlay"
      >
        <div className="closeModal"></div>
        <div></div>
      </Modal>
    </div>
  );
};
