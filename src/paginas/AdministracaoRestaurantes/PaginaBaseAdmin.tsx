import { Button, Typography, Container, Toolbar, Link, AppBar, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Link as RouterLink, Outlet } from "react-router-dom"; //alterando o nome para nao gerar conflito

const PaginaBaseAdmin = () => {
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
                     <Outlet/>{/*indicando para o react router onde ira renderizar os filhos*/}
                    </Paper>
                </Container>
            </Box>

        </>
    )
}

export default PaginaBaseAdmin;