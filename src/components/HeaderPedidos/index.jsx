import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { IMaskInput } from "react-imask";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle className="dialogTitle">
          Cadastro
          <IconButton aria-label="close" onClick={handleClose} className="closeButton">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="dialogContent" style={{ padding: "20px" }}>
          <TextField
            sx={{
              width: "90%",
              margin: "0 auto",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#5c1302", // Cor da borda quando focado
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#5c1302", // Cor do label quando focado
              },
            }}
            autoFocus
            margin="dense"
            label="Telefone"
            placeholder="(00) 90000-0000"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            sx={{
              width: "90%",
              margin: "0 auto",
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
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="E-mail"
            type="email"
            fullWidth
            variant="outlined"
            sx={{
              width: "90%",
              margin: "0 auto",
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
              margin: "0 auto",
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
            label="Data de nascimento"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            sx={{
              width: "90%",
              margin: "0 auto",
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
            label="Gênero"
            select
            fullWidth
            variant="outlined"
            SelectProps={{
              native: true,
            }}
          >
            <option value="" />
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </TextField>
        </DialogContent>
        <DialogActions style={{ padding: "0px 20px 20px" }}>
          <button className="buttonBag">Fazer Pedido</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
