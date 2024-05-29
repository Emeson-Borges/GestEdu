import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListarCurso.css';
import Header from '../../../Components/Header/Header.js';
import Footer from '../../../Components/Footer/Footer.js';

function ListarCursos() {
  const [cursos, setCursos] = useState([]);
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroNivel, setFiltroNivel] = useState('');

  useEffect(() => {
    // Função para buscar cursos do servidor
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cursos/listar/');
        setCursos(response.data);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    };

    // Chamada da função para buscar cursos quando o componente é montado
    fetchCursos();
  }, []);

  // Função para filtrar os cursos com base nos critérios de filtro
  const filtrarCursos = () => {
    // Lógica para filtrar os cursos com base nos filtros aplicados
    // Atualizar o estado 'cursos' com os cursos filtrados
  };

  // Função para editar um curso
  const editarCurso = (id) => {
    // Lógica para redirecionar para a página de edição do curso com o ID especificado
  };

  // Função para limpar os filtros
  const limparFiltros = () => {
    setFiltroNome('');
    setFiltroNivel('');
    // Lógica para recarregar todos os cursos novamente
  };

  return (
    <div>
        <div>
      <Header />
      </div>
    <div className="page-ListarCurso">
      <h1>Listagem de Cursos</h1>
      {/* Filtros */}
      <div className="edit-search">
        <input type="text" value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} placeholder="Filtrar por nome" />
        <input type="text" value={filtroNivel} onChange={(e) => setFiltroNivel(e.target.value)} placeholder="Filtrar por nível" />
      </div>
      <div className="buttom-search">
        <button onClick={filtrarCursos}>Filtrar</button>
        <button onClick={limparFiltros}>Limpar Filtros</button>
      </div>
      {/* Tabela de Cursos */}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Nível</th>
            <th>Duração</th>
            <th>Preço</th>
            <th>Vagas Disponíveis</th>
            <th>Certificação</th>
            <th>Pré-requisitos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.nome}</td>
              <td>{curso.descricao}</td>
              <td>{curso.nivel}</td>
              <td>{curso.duracao}</td>
              <td>{curso.preco}</td>
              <td>{curso.vagas_disponiveis}</td>
              <td>{curso.certificacao ? 'Sim' : 'Não'}</td>
              <td>{curso.pre_requisitos}</td>
              <td>
                <button onClick={() => editarCurso(curso.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Footer />
    </div>
  );
}

export default ListarCursos;
