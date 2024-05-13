import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import ControleEditora from "@/classes/controle/ControleEditora";
import Livro from "@/classes/modelo/Livro";
import Head from "next/head";
import { Menu } from "@/componente/Menu";
import styles from '../styles/Home.module.css'

const LivroDados = () => {
  const controleEditora = new ControleEditora();
  const baseURL = "http://localhost:3000/api/livros";

  const [codEditora, setCodEditora] = useState<number>(0);
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const navigate = useRouter().push;

  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora, 
    text: editora.nome
  }));

  function tratarCombo(event: React.ChangeEvent<HTMLSelectElement>) {
    setCodEditora(Number(event.target.value));
  }

  const incluirLivro = async (livro: Livro) => {
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(livro),
    });
    return response.ok;
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro = new Livro(
        0,
        codEditora,
        titulo,
        resumo,
        autores.split('\n'),
    );
    const ok = await incluirLivro(livro);
    if (ok) {
        navigate('/LivroLista');
    }
};

  return (
    <div className={styles.container}>
      <Head>
        <title>Novo Livro</title>
      </Head>

      <Menu />

      <main className={styles.main}>
        <h2 className={styles.title}>Dados do Livro</h2>
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
    </div>
  );
}

export default LivroDados;