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

    const contatoRef = ref(database, "contatos");
    push(contatoRef, {
      usuario: user ? { id: user.id, name: user.name } : null, // Inclui informações do usuário se estiver logado
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
    <div className="faleConoscoContainer">
      <h2>Fale Conosco</h2>
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
        <Button onClick={handleSubmit} variant="contained" className="submitButton">
          Enviar
        </Button>
      </form>
    </div>
  );
};
