import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { IMaskInput } from "react-imask";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";
//
const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#0) 00000-0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const HeaderPedidos = () => {
  //mui masks
  const [values, setValues] = React.useState({
    phoneNumber: "",
    name: "",
    email: "",
    birthday: "",
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  //functions
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCadastrar = () => {
    if (!values.name || !values.birthday || !values.phoneNumber || !values.email) {
      console.log("nao entrei");
    }
    console.log(values);
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
        <button className="navButton" onClick={handleClickOpen}>
          <PersonIcon />
          <span>Entrar/Cadastrar</span>
        </button>
      </div>

      {/* dialog cadastrar */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <div className="divCloseButton">
          <IconButton aria-label="close" onClick={handleClose} className="closeButton">
            <CloseIcon />
          </IconButton>
        </div>
        <h2 className="dialogTitle">Cadastro</h2>
        <DialogContent className="dialogContent" style={{ padding: "20px" }}>
          <TextField
            sx={{
              width: "90%",
              margin: "8px auto",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#5c1302", // Cor da borda quando focado
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#5c1302", // Cor do label quando focado
              },
            }}
            label="Telefone"
            placeholder="(00) 90000-0000"
            value={values.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
            id="formatted-text-mask-input"
            InputProps={{
              inputComponent: TextMaskCustom,
            }}
            fullWidth
            variant="outlined"
          />
          <TextField
            sx={{
              width: "90%",
              margin: "8px auto",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#5c1302", // Cor da borda quando focado
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#5c1302", // Cor do label quando focado
              },
            }}
            margin="dense"
            label="Seu nome *"
            placeholder="Informe seu Nome e sobrenome"
            name="name"
            value={values.name}
            onChange={handleChange}
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="E-mail"
            placeholder="Informe seu e-mail"
            value={values.email}
            onChange={handleChange}
            name="email"
            type="email"
            fullWidth
            variant="outlined"
            sx={{
              width: "90%",
              margin: "8px auto",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#5c1302", // Cor da borda quando focado
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#5c1302", // Cor do label quando focado
              },
            }}
          />
          <TextField
            sx={{
              width: "90%",
              margin: "8px auto",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#5c1302", // Cor da borda quando focado
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#5c1302", // Cor do label quando focado
              },
            }}
            margin="dense"
            value={values.birthday}
            onChange={handleChange}
            label="Data de nascimento"
            name="birthday"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <div>
            <a href="">Já possui cadastro?</a>
          </div>
        </DialogContent>

        <DialogActions style={{ padding: "0px 20px 20px" }}>
          <button onClick={handleCadastrar} className="buttonBag">
            Fazer Cadastro
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
