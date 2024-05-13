import { useState, useEffect } from 'react';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';

function LinhaLivro(props) {
  const controleEditora = new ControleEditora();
  const nomeEditora = controleEditora.getNomeEditora(props.livro.codEditora);
  return (
    <tr>
      <td className='border-bottom text-center py-2'>
        {props.livro.titulo}
        <br />
        <button className="btn btn-danger" onClick={() => props.excluir(props.livro.codigo)}>Excluir</button>
      </td>
      <td className='border-bottom py-2' style={{textAlign: 'justify'}}>{props.livro.resumo}</td>
      <td className='border-bottom py-2 text-center'>{nomeEditora}</td>
      <td className='border-bottom py-2'>
        <ul>
          {props.livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

export default function LivroLista() {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    async function carregarLivros() {
      const controleLivros = new ControleLivros();
      const livros = await controleLivros.obterLivros();
      setLivros(livros);
      setCarregado(true);
    }
    if (!carregado) {
      carregarLivros();
    }
  }, [carregado]);

  const excluir = (codigo) => {
    const controleLivros = new ControleLivros();
    controleLivros.excluir(codigo);
    setCarregado(false);
  };

  return (
    <main className='container'>
      <h1 className='text-center py-4'>Catálogo de Livros</h1>
      <table className='container-fluid'>
        <thead>
          <tr className='text-light bg-dark col'>
            <th className='p-3 col-2 '>Título</th>
            <th className='p-3 col-7'>Resumo</th>
            <th className='p-3 col-1'>Editora</th>
            <th className='p-3 col-2'>Autores</th>
          </tr>
        </thead>
          <tbody>
            {livros.map((livro) => (
                  <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
                
            ))}
          </tbody>
      </table>
      {livros.length <= 0 ? (<h2 className='text-center py-5'>Estoque de livros vazio 😢</h2>) : (<></>)}
    </main>
  );
}
