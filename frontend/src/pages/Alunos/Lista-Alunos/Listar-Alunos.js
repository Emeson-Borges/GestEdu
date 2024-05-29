import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Listar-Alunos.css';
import Header from '../../../Components/Header/Header.js';
import Footer from '../../../Components/Footer/Footer.js';
import styles from '../../../Components/Header/Header.module.css';
import '../../../Components/Footer/Footer.module.css';

function ListarAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [filtroTurma, setFiltroTurma] = useState('');
  const [filtroAno, setFiltroAno] = useState('');
  const [filtroMatricula, setFiltroMatricula] = useState('');
  const [alunosFiltrados, setAlunosFiltrados] = useState([]);

  useEffect(() => {
    // Função para buscar alunos do servidor
    const fetchAlunos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/alunos/');
        setAlunos(response.data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };

    // Chamada da função para buscar alunos quando o componente é montado
    fetchAlunos();
  }, []);

    

  // Função para editar um aluno
  const editarAluno = (id) => {
    // Lógica para redirecionar para a página de edição do aluno com o ID especificado
  };
    
  const excluirAluno = (id) => {
    // Lógica para redirecionar para a página de edição do aluno com o ID especificado
  };
    
  const visualizarDetalhes = (id) => {
    // Lógica para redirecionar para a página de edição do aluno com o ID especificado
  };

    const filtrarAlunos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/filtrar_alunos/', {
          params: {
            ano: filtroAno || undefined,
            matricula: filtroMatricula || undefined
          }
        });
        setAlunosFiltrados(response.data);
      } catch (error) {
        console.error('Erro ao filtrar alunos:', error);
      }
    };
  
    const limparFiltros = () => {
      setFiltroAno('');
      setFiltroMatricula('');
      filtrarAlunos(); // Chama a função de filtragem para recarregar todos os alunos novamente
    };
  
    useEffect(() => {
      filtrarAlunos();
    }, [filtroAno, filtroMatricula]);
  
  

  return (
    <div>
      <div>
      <Header />
      </div>
    <div className="Listar-Alunos">
      <h1>Listagem de Alunos</h1>
      {/* Filtros */}
      <div className='edit-search'>
        <input type="text" value={filtroTurma} onChange={(e) => setFiltroTurma(e.target.value)} placeholder="Filtrar por turma" />
        <input type="text" value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)} placeholder="Filtrar por ano" />
        <input type="text" value={filtroMatricula} onChange={(e) => setFiltroMatricula(e.target.value)} placeholder="Pesquisar por matrícula" />
      </div> 
      <div className='buttom-search'>
        <button onClick={filtrarAlunos}>Filtrar</button>
        <button onClick={limparFiltros}>Limpar Filtros</button>
      </div>
      {/* Tabela de Alunos */}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Turma</th>
            <th>Ano</th>
            <th>Matrícula</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.turma}</td>
              <td>{aluno.ano}</td>
              <td>{aluno.matricula}</td>
              <td>
                <button onClick={() => editarAluno(aluno.id)}>Editar</button>
                <button onClick={() => excluirAluno(aluno.id)}>Excluir</button>
                <button onClick={() => visualizarDetalhes(aluno.id)}>Visualizar Detalhes</button>
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

export default ListarAlunos;
