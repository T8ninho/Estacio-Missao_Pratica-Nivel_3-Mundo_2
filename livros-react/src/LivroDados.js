  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import ControleLivros from './controle/ControleLivros';
  import ControleEditora from './controle/ControleEditora';

  function LivroDados() {
    const controleLivro = new ControleLivros();
    const controleEditora = new ControleEditora();
    
    const opcoes = controleEditora.getEditoras().map((editora) => {
      return { value: editora.codEditora, text: editora.nome };
    });

    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes[0].value);

    const navigate = useNavigate();

    function tratarCombo(event) {
      setCodEditora(Number(event.target.value));
    }

    function incluir(event) {
      event.preventDefault();
      const livro = {
        codigo: 0,
        titulo: titulo,
        resumo: resumo,
        autores: autores.split('\n'),
        codEditora: codEditora
      };
      controleLivro.incluir(livro);
      navigate('/'); 
    }

    return (
      <main>
        <h2 className="my-4 text-center">Dados do Livro</h2>
        <form onSubmit={incluir} className="row col-6 mx-auto">
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input required type="text" id="titulo" className="form-control" value={titulo} onChange={(event) => setTitulo(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="resumo">Resumo:</label>
            <textarea required id="resumo" className="form-control" value={resumo} onChange={(event) => setResumo(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="codEditora">Editora:</label>
            <select required id="codEditora" className="form-control" value={codEditora} onChange={tratarCombo}>
              <option value="">Selecione</option>
              {opcoes.map((opcao) => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="autores">Autores:</label>
            <textarea required id="autores" className="form-control" value={autores} onChange={(event) => setAutores(event.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary mt-4">Incluir</button>
        </form>
    </main>
  );
  }

  export default LivroDados;
