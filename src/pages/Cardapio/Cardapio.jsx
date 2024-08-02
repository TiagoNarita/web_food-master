import React, { useEffect, useState } from "react";
import "./styles.css";

import { Footer } from "../../components/Footer";
import { database } from "../../utils/firebase";
import { get, ref } from "firebase/database";

export const Cardapio = () => {
  const [burgers, setBurgers] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const dbRef = ref(database, "Menu");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setBurgers(data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="App-cardapio">
      <div>
        <header className="header-cardapio">
          <h2>OS FAMOSOS HAMBÚRGUERES</h2>
          <h3>Conheças os hambúrgueres da nossa casa</h3>
        </header>
      </div>
      <img src={"/images/footer.webp"} alt="Burger" className="footer-burguer"></img>
      <div className="cardapio">
        {burgers.map((burger, index) => (
          <div key={index} className="burger-item">
            <img src={burger.image} alt={burger.title} className="burger-image" />
            <div className="burger-content-desc">
              <h2 className="burger-title">{burger.title}</h2>
              <p className="burger-description">{burger.description}</p>
            </div>
            <p className="burger-price">{burger.price}</p>
          </div>
        ))}
      </div>
      <div className="beforee-footer"></div>
      <Footer />
    </div>
  );
};
