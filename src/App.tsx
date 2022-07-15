import { Routes, Route } from 'react-router-dom';
import AdministracaoRestaurantes from './paginas/AdministracaoRestaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './paginas/AdministracaoRestaurantes/FormularioRestaurante';
import PaginaBaseAdmin from './paginas/AdministracaoRestaurantes/PaginaBaseAdmin';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaBaseAdmin/>}>
      <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurante />} />
      <Route path="/admin/restaurantes/:id" element={<FormularioRestaurante />} />
      </Route>
    
    </Routes>
  );
}

export default App;
