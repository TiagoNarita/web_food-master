import React, { useEffect, useState } from "react";
import "./styles.css";

import { Footer } from "../../components/Footer";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { BurguerCard } from "../../components/BurguerCard";
import { Cart } from "../../components/Cart";
import { database } from "../../utils/firebase";
import { get, ref, set, push, update, remove } from "firebase/database";
import { Loader } from "../../components/Loader";
import PropTypes from "prop-types";

const Header = () => {
  return (
    <div className="headerContainer">
      <header className="header-pedidos">
        <h2>FAÇA SEU PEDIDO AQUI</h2>
        <h3>EXPERIMENTE E SE APAIXONE PELA BURGUER HOUSE</h3>
      </header>
      <img src={"/images/footer.webp"} alt="Burger" className="footerCart" />
    </div>
  );
};

const Pedidos = ({ user }) => {
  const [burgers, setBurgers] = useState([]);
  const [cart, setCart] = useState([]);
  const [adm, setAdm] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBurger, setCurrentBurger] = useState(null);
  const [newBurger, setNewBurger] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = ref(database, "Menu");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const burgersArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setBurgers(burgersArray);
        } else {
          setBurgers([]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setBurgers([]);
      }

      if (user.name === "admim" && user.senha === "adm") {
        setAdm(true);
      }
    };
    fetchData();
  }, [user]);

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

  const handleOpenModal = (burger = null) => {
    setCurrentBurger(burger);
    setNewBurger(burger ? burger : { title: "", price: "", description: "", image: "" });
    setModalOpen(true);
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    setNewBurger({ ...newBurger, [e.target.name]: e.target.value });
  };

  const saveBurger = async () => {
    // Prevenção de input vazio
    if (!newBurger.title || !newBurger.price || !newBurger.description || !newBurger.image) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    const burgerToSave = {
      ...newBurger,
    };

    if (currentBurger) {
      const burgerRef = ref(database, `Menu/${currentBurger.id}`);
      await update(burgerRef, burgerToSave);
      setBurgers((prevBurgers) =>
        prevBurgers.map((b) =>
          b.id === currentBurger.id ? { id: currentBurger.id, ...burgerToSave } : b
        )
      );
    } else {
      const newBurgerRef = ref(database, "Menu");
      const newBurgerSnap = await push(newBurgerRef, burgerToSave);
      setBurgers((prevBurgers) => [...prevBurgers, { id: newBurgerSnap.key, ...burgerToSave }]);
    }

    handleCloseModal();
  };

  const deleteBurger = async (burger) => {
    try {
      const dbRef = ref(database, `Menu/${burger.id}`);
      await remove(dbRef);
      setBurgers((prevBurgers) => prevBurgers.filter((b) => b.id !== burger.id));
    } catch (error) {
      console.error("Erro ao apagar burger:", error);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="App-pedidos">
      <Header />
      {adm && (
        <div className="divButtonAdm">
          <Button
            id="basic-button"
            onClick={() => {
              handleOpenModal();
            }}
            sx={{ color: "#601706" }}
          >
            Adicionar
          </Button>
        </div>
      )}

      <div className="pedidos-content">
        {burgers.length === 0 ? (
          <div className="loaderContain">
            <Loader />
          </div>
        ) : (
          <>
            <div className="burgersListCart">
              {burgers.map((burger, index) => (
                <BurguerCard
                  key={index}
                  burger={burger}
                  addToCart={addToCart}
                  onEdit={() => handleOpenModal(burger)}
                  onDelete={() => deleteBurger(burger)}
                  adm={adm}
                />
              ))}
            </div>
          </>
        )}
        <div className="cartCont">
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
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

      {/* Modal para Adicionar/Editar Burger */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div className="modal-content">
          <h2>{currentBurger ? "Editar Burger" : "Adicionar Burger"}</h2>
          <TextField
            name="title"
            label="Nome"
            value={newBurger.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="price"
            label="Preço"
            value={newBurger.price}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Descrição"
            value={newBurger.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="image"
            label="URL da Imagem"
            value={newBurger.image}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Button onClick={saveBurger} variant="contained" color="primary">
            {currentBurger ? "Salvar Alterações" : "Adicionar Burger"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

Pedidos.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    senha: PropTypes.string.isRequired,
  }).isRequired,
};

export default Pedidos;
