import { TextField, Button, Typography, Container, Toolbar, Link, AppBar, Paper } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import IRestaurante from "../../interfaces/IRestaurante";
import { Link as RouterLink } from "react-router-dom"; //alterando o nome para nao gerar conflito

const FormularioRestaurante = () => {

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros]) //se esse cara falhar, o segundo parametro tem que rodar de novo

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmiterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault() //nao recarregar a pagina

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                })
        } else {
            http.post('restaurantes/', {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                })
        }
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth='xl'>
                    <Toolbar>
                        <Typography variant="h6">
                            Administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo Restaurante
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>

            </AppBar>

            <Box>
                <Container maxWidth='lg' sx={{ marginTop: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        {/*Conteudo da pagina*/}
                        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                            <Typography sx={{ marginTop: 1 }} component="h1" variant="h6">Formulário de Restaurantes</Typography>
                            <Box component="form" sx={{width: '100%'}}onSubmit={aoSubmiterForm}>
                                <TextField value={nomeRestaurante} onChange={evento => setNomeRestaurante(evento.target.value)} id="standard-basic"
                                    label="Nome do Restaurante"
                                    variant="standard"
                                    fullWidth
                                    required />
                                <Button sx={{ marginTop: 1 }} type='submit' variant="outlined" fullWidth>Salvar</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>

        </>
    )
}

export default FormularioRestaurante;