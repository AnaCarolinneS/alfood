import { TextField, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmiterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault() //nao recarregar a pagina

        console.log('preciso enviar dados para a api');
        axios.post('http://localhost:8000/api/v2/restaurantes/', {
            nome: nomeRestaurante
        })
        .then (() => {
            alert("Restaurante cadastrado com sucesso!")
        })
    }

    return (
        <form onSubmit={aoSubmiterForm}>
            <TextField value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)} id="standard-basic"
            label="Nome do Restaurante" 
            variant="standard" />
            <Button type='submit' variant="outlined">Salvar</Button>
        </form>

    )
}

export default FormularioRestaurante;