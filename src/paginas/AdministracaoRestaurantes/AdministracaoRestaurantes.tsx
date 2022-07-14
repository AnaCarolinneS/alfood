import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IRestaurante from "../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => { //arrow function
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const excluir = (restauranteExcluido: IRestaurante) => {
     axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteExcluido.id}/`)
     .then(() => {
        const listaRestaurantesAtualizados = restaurantes.filter(restaurante => restaurante.id !== restauranteExcluido.id) //restaurantes que tenham o id diferente do que foi excluido!
        setRestaurantes([...listaRestaurantesAtualizados])
     })
    }
    return (

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
                           [<Link to={`/admin/restaurantes/${restaurante.id}`}> Editar </Link>]
                        </TableCell>
                        <TableCell>
                         <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>Excluir</Button>
                        </TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes;