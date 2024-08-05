import React, { useEffect, useState } from "react";
import "./styles.css";

import { Footer } from "../../components/Footer";

import { BurguerCard } from "../../components/BurguerCard";
import { Cart } from "../../components/Cart";
import { database } from "../../utils/firebase";
import { get, ref } from "firebase/database";
import { Loader } from "../../components/Loader";

const Header = () => {
  return (
    <div className="headerContainer">
      <header className="header-pedidos">
        <h2>FAÇA SEU PEDIDO AQUI</h2>
        <h3>EXPERIMENTE E SE APAIXONE PELA BURGUER HOUSE</h3>
      </header>
      <img src={"/images/footer.webp"} alt="Burger" className="footerCart"></img>
    </div>
  );
};

const Pedidos = () => {
  const [burgers, setBurgers] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database, "Menu");
        // Obtém os dados na referência
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setBurgers(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const addToCart = (burger) => {
    const existingItemIndex = cart.findIndex((item) => item.title === burger.title);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantidade += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...burger, quantidade: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantidade > 1) {
      newCart[index].quantidade -= 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const removeAll = () => {
    setCart([]);
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) =>
          total + parseFloat(item.price.replace("R$ ", "").replace(",", ".")) * item.quantidade,
        0
      )
      .toFixed(2);
  };

  const exportOrder = () => {
    const orderData = {
      items: cart.map((item) => ({
        title: item.title,
        price: item.price,
        quantidade: item.quantidade,
      })),
      total: `R$ ${calculateTotal()}`,
      local: "burguer - house",
    };

    const orderJson = JSON.stringify(orderData, null, 2);
    const blob = new Blob([orderJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "order.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const editCartItem = (index) => {
    // Lógica para editar o item do carrinho
    console.log("Edit item at index:", index);
    console.log(cart);
  };

  return (
    <div className="App-pedidos">
      <Header />
      <div className="pedidos-content">
        {burgers.length == 0 ? (
          <div className="loaderContain">
            <Loader />
          </div>
        ) : (
          <div className="burgersListCart">
            {burgers.map((burger, index) => (
              <BurguerCard key={index} burger={burger} addToCart={addToCart} />
            ))}
          </div>
        )}
        <div className="cartCont">
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            editCartItem={editCartItem}
            calculateTotal={calculateTotal}
            exportOrder={exportOrder}
            removeAll={removeAll}
          />
        </div>
      </div>
      <div className="footerDiv">
        <h1></h1>
      </div>
      <Footer />
    </div>
  );
};

export default Pedidos;
