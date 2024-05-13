import './App.css';
import LivroDados from './LivroDados';
import LivroLista from './LivroLista';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
      <>
          <header>
              <nav className='menu nav navbar-dark bg-dark'>           
                  <Link className="nav-link link-light" to="/">Catálogo</Link>
                  <Link className="nav-link link-light" to="/LivroDados">Novo</Link>
              </nav>
          </header>
          <main className='conteudo-principal'>
              <Routes>
                  <Route path="/" element={<LivroLista />} />
                  <Route path='LivroDados' element={<LivroDados />} />
              </Routes>
          </main>
      </>
  );
}


export default App;
