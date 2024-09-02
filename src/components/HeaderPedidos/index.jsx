import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { IMaskInput } from "react-imask";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogActions, TextField, IconButton } from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";
import { toast } from "react-toastify";
import { database } from "../../utils/firebase";
import { ref, push, get, child } from "firebase/database"; // Importa funções necessárias
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
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

export const HeaderPedidos = ({ user, setUser }) => {
  const [values, setValues] = useState({
    phoneNumber: "",
    name: "",
    email: "",
    senha: "",
  });

  const [open, setOpen] = useState(false); // Estado para o modal de cadastro
  const [openLogin, setOpenLogin] = useState(false); // Estado para o modal de login

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleCadastrar = () => {
    if (!values.name || !values.senha || !values.phoneNumber || !values.email) {
      toast.error("Preencha todas as informações !", {
        position: "top-center",
        theme: "colored",
      });
    } else {
      const usersRef = ref(database, "users");
      console.log(values);
      push(usersRef, {
        phoneNumber: values.phoneNumber,
        name: values.name,
        email: values.email,
        senha: values.senha,
      })
        .then(() => {
          toast.success("Cadastro realizado com sucesso!");
          setUser(values);
          setValues({
            phoneNumber: "",
            name: "",
            email: "",
            senha: "",
          });
          setOpen(false);
          console.log(user);
        })
        .catch((error) => {
          toast.error("Erro ao cadastrar usuário: " + error.message);
        });
    }
  };

  const handleLogin = () => {
    console.log(values);
    const dbRef = ref(database);
    get(child(dbRef, `users`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const users = snapshot.val();
          const foundUser = Object.values(users).find(
            (user) => user.email === values.email && user.senha === values.senha
          );
          if (foundUser) {
            toast.success("Login realizado com sucesso!");
            console.log(foundUser);
            setOpenLogin(false);
            setUser(foundUser);
            // Aqui você pode definir o estado do usuário ou redirecionar para outra página
            console.log(user);
          } else {
            toast.error("E-mail ou senha incorretos.");
          }
        } else {
          toast.error("Nenhum usuário encontrado.");
        }
      })
      .catch((error) => {
        toast.error("Erro ao buscar usuários: " + error.message);
      });
  };

  const handleOpenLoginModal = () => {
    setOpen(false); // Fecha o modal de cadastro
    setOpenLogin(true); // Abre o modal de login
    setValues({
      phoneNumber: "",
      name: "",
      email: "",
      senha: "",
    });
  };

  const handleOpenCadastroModal = () => {
    setOpenLogin(false); // Abre o modal de login
    setOpen(true); // Fecha o modal de cadastro
    setValues({
      phoneNumber: "",
      name: "",
      email: "",
      senha: "",
    });
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
        <Link to="/faleConosco" className="navLink">
          <button className="navButton">
            <ContactSupportIcon />
            <span>Fale conosco</span>
          </button>
        </Link>
        {!user.name ? (
          <button className="navButton" onClick={handleClickOpen}>
            <PersonIcon />
            <span>Entrar/Cadastrar</span>
          </button>
        ) : (
          <button className="navButton">
            <PersonIcon />
            <span>Minha conta</span>
          </button>
        )}
      </div>

      {/* Modal de Cadastro */}
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
            value={values.senha}
            onChange={handleChange}
            label="Senha"
            name="senha"
            placeholder="Informe sua senha"
            type="password"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <div className="linkLogin">
            <a href="#" onClick={handleOpenLoginModal}>
              Já possui cadastro?
            </a>
          </div>
        </DialogContent>

        <DialogActions style={{ padding: "0px 20px 20px" }}>
          <button onClick={handleCadastrar} className="buttonBag">
            Fazer Cadastro
          </button>
        </DialogActions>
      </Dialog>

      {/* Modal de Login */}
      <Dialog open={openLogin} onClose={handleCloseLogin} maxWidth="xs" fullWidth>
        <div className="divCloseButton">
          <IconButton aria-label="close" onClick={handleCloseLogin} className="closeButton">
            <CloseIcon />
          </IconButton>
        </div>
        <h2 className="dialogTitle">Login</h2>
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
            label="E-mail"
            placeholder="Informe seu e-mail"
            value={values.email}
            onChange={handleChange}
            name="email"
            type="email"
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
            label="Senha"
            placeholder="Informe sua senha"
            value={values.senha}
            onChange={handleChange}
            name="senha"
            type="password"
            fullWidth
            variant="outlined"
          />
          <div className="linkLogin">
            <a href="#" onClick={handleOpenCadastroModal}>
              Quero me cadastrar
            </a>
          </div>
        </DialogContent>

        <DialogActions style={{ padding: "0px 20px 20px" }}>
          <button onClick={handleLogin} className="buttonBag">
            Fazer Login
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
