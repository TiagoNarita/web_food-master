import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { database } from "../../utils/firebase"; // Ajuste o caminho conforme necessário
import { ref, push } from "firebase/database";
import "./FaleConosco.css";

export const FaleConosco = ({ user }) => {
  const [formData, setFormData] = useState({
    assunto: "",
    mensagem: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.assunto || !formData.mensagem) {
      toast.error("Preencha todos os campos!", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }

    if (!user.name) {
      {
        console.log("nao existe um user ");
        toast.error("Você não está logado, faça o login primeiro!", {
          position: "top-center",
          theme: "colored",
        });
        return;
      }
    }

    const contatoRef = ref(database, "contatos");
    push(contatoRef, {
      usuario: { name: user.name, email: user.email }, // Inclui informações do usuário se estiver logado
      assunto: formData.assunto,
      mensagem: formData.mensagem,
      data: new Date().toLocaleString(),
    })
      .then(() => {
        toast.success("Mensagem enviada com sucesso!");
        setFormData({
          assunto: "",
          mensagem: "",
        });
      })
      .catch((error) => {
        toast.error("Erro ao enviar mensagem: " + error.message);
      });
  };

  return (
    <>
      <header className="header-cardapio headerFale">
        <h2>Fale conosco</h2>
        <h3>Esclareça ou tire qualquer duvida que tenha tido com nosso trabalho</h3>
      </header>
      <img src={"/images/footer.webp"} alt="Burger" className="footer-burguer"></img>
      <div className="faleConoscoContainer">
        <form className="faleConoscoForm" noValidate autoComplete="off">
          <TextField
            label="Assunto"
            name="assunto"
            value={formData.assunto}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="dense"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#5c1302",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#5c1302",
              },
            }}
          />
          <TextField
            label="Mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="dense"
            multiline
            rows={4}
            sx={{
              marginBottom: "30px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#5c1302",
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#5c1302",
              },
            }}
          />
          <button type="button" onClick={handleSubmit} variant="contained" className="buttonBag">
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};
