import { Footer } from "../../components/Footer";

import "./styles.css";

export const Home = () => {
  return (
    <main className="App-main">
      <div className="container-main">
        <div className="App-images">
          <img src="/images/burguer.webp" alt="Burger" className="image-burguer" />
        </div>
        <div className="title-burguer">
          <h1>Delivery de Hamburguer</h1>
          <h2>Comer bem só aqui no Burguer House!</h2>
        </div>
      </div>

      <Footer />
    </main>
  );
};
