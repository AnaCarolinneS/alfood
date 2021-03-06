import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

import { Link as RouterLink } from "react-router-dom"; //alterando o nome para nao gerar conflito

const AdministracaoRestaurantes = () => { //arrow function
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    //O axios recebe como primeiro parâmetro o endereço para onde faremos a requisição. Já o segundo argumento é //um objeto literal que será transformado em json e enviado no corpo da requisição, dessa forma:

    const excluir = (restauranteExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteExcluido.id}/`)
            .then(() => {
                const listaRestaurantesAtualizados = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id) //restaurantes que tenham o id diferente do que foi excluido!
                setRestaurantes([...listaRestaurantesAtualizados])
            })
    }
    return (

        <>
            {/*Conteudo da pagina*/}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                Editar
                            </TableCell>
                            <TableCell>
                                Excluir
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                            <TableCell>
                                {restaurante.nome}
                            </TableCell>
                            <TableCell>
                                [<RouterLink to={`/admin/restaurantes/${restaurante.id}`}> Editar </RouterLink>]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>Excluir</Button>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}

export default AdministracaoRestaurantes;