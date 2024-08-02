import { SlHandbag } from "react-icons/sl";
import { TbMapPinQuestion } from "react-icons/tb";
import { RiArrowRightWideFill } from "react-icons/ri";
import "./styles.css";
import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import StorefrontIcon from "@mui/icons-material/Storefront";

export const Cart = ({
  cart,
  removeFromCart,
  editCartItem,
  calculateTotal,
  exportOrder,
  removeAll,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="cart">
      <button
        className="buttonFrete"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <TbMapPinQuestion className="mapIcon" />
        <p>Calcular a taxa de e tempo de entrega</p>
        <RiArrowRightWideFill className="arrowIcon" />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box px={2} py={1}>
          <Typography variant="subtitle1">Como você deseja receber o pedido?</Typography>
        </Box>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <DeliveryDiningIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Entrega" secondary="A gente leva até você" />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <StorefrontIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Retirada" secondary="Você retira no local" />
        </MenuItem>
      </Menu>
      <div className="bagContainer">
        {cart.length === 0 ? (
          <div className="bag">
            <SlHandbag className="bagIcon" />
            <div className="headerBag">
              <p className="sacolaVazia">Sacola vazia</p>
            </div>
          </div>
        ) : (
          <div className="bagFull">
            <div className="headerCart">
              <p>Sua sacola</p>
              <button onClick={() => removeAll()}>LIMPAR</button>
            </div>
            {cart.map((item, index) => (
              <div
                key={index}
                className="cart-item"
                style={{ cursor: "pointer" }}
                onClick={() => editCartItem(index)}
              >
                <div className="cart-item-details">
                  <div className="containePrice">
                    <p className="itenQuantity">{item.quantidade}x</p>
                    <p>{item.title}</p>
                  </div>
                  <p className="priceCart">{item.price}</p>
                </div>

                <div className="divButtons">
                  <div className="buttonsCart">
                    <button
                      className="editCartButton"
                      onClick={(e) => {
                        e.stopPropagation();
                        editCartItem(index);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(index);
                      }}
                      className="remove-button"
                    >
                      Remover
                    </button>
                  </div>
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cart.length !== 0 && (
        <div className="price">
          <div className="subtotal">
            <p>subtotal</p>
            <p>R$ {calculateTotal()}</p>
          </div>
          <div className="subtotal">
            <p>Taxa de entrega</p>
            <p>A definir</p>
          </div>
          <div className="subtotal totalPrice">
            <p>Total</p>
            <p>R$ {calculateTotal()}</p>
          </div>
        </div>
      )}
      <div className="buttonContainer">
        <button className="buttonBag" onClick={exportOrder} disabled={cart[0] ? false : true}>
          Fazer Pedido
        </button>
      </div>
    </div>
  );
};
