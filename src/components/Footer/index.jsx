import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./styles.css";

export const Footer = () => {
  return (
    <>
      <div className="before-footer">
        <img src="/images/footer.webp" alt="footer" className="footer-burguer" />
        <h2>Programa de fidelidade!</h2>
        <p>
          A cada 10 pedidos que você fizer pelo site, você ganha 1 lanche da casa no seu próximo
          pedido!
        </p>
        <h3>Burguer House</h3>
      </div>
      <footer className="App-social-media">
        <a href="https://github.com/TiagoNarita" target="_blank" rel="noopener noreferrer">
          <FaGithub className="social-icon" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="social-icon" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="social-icon" />
        </a>
      </footer>
    </>
  );
};
