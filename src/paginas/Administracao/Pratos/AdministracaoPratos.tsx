import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

import { Link as RouterLink } from "react-router-dom"; //alterando o nome para nao gerar conflito


const AdministracaoPratos = () => { //arrow function
    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>('pratos/')
            .then(resposta => setPratos(resposta.data))
    }, [])

    //O axios recebe como primeiro parâmetro o endereço para onde faremos a requisição. Já o segundo argumento é //um objeto literal que será transformado em json e enviado no corpo da requisição, dessa forma:

    const excluir = (pratoExcluido: IPrato) => {
        http.delete(`pratos/${pratoExcluido.id}/`)
            .then(() => {
                const listaPratosAtualizados = pratos.filter(prato => prato.id !== pratoExcluido.id) //pratos que tenham o id diferente do que foi excluido!
                setPratos([...listaPratosAtualizados])
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
                        {pratos.map(prato => <TableRow key={prato.id}>
                            <TableCell>
                                {prato.nome}
                            </TableCell>
                            <TableCell>
                                [<RouterLink to={`/admin/pratos/${prato.id}`}> Editar </RouterLink>]
                            </TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>Excluir</Button>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}

export default AdministracaoPratos;