import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Listar-Alunos.css';
import Header from '../../../Components/Header/Header.js';
import Footer from '../../../Components/Footer/Footer.js';
import styles from '../../../Components/Header/Header.module.css';
import '../../../Components/Footer/Footer.module.css';

import ModalSucesso from '../../../Components/ModalSucesso/ModalSucesso';
import ModalErro from '../../../Components/ModalErro/ModalErro';
import ModalConfirmacao from '../../../Components/ModalConfirmacao/ModalConfirmacao.js';

function ListarAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [filtroTurma, setFiltroTurma] = useState('');
  const [filtroAno, setFiltroAno] = useState('');
  const [filtroMatricula, setFiltroMatricula] = useState('');
  const [alunosFiltrados, setAlunosFiltrados] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

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
    

  // Função para abrir o modal de confirmação antes de excluir um aluno
  const confirmarExclusao = (id) => {
    setAlunoSelecionado(id);
    setShowModal(true);
  };

  // Função para excluir um aluno
  const excluirAluno = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/alunos/${alunoSelecionado}/`);
      // Atualizar a lista de alunos após a exclusão
      setAlunos(alunos.filter(aluno => aluno.id !== alunoSelecionado));
      // Fechar o modal de confirmação
      setShowModal(false);
      console.log('Aluno excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
    }
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setShowModal(false);
    setAlunoSelecionado(null);
  };



// Função para abrir modais
const openModal = ({ type, message, aluno }) => {
  switch (type) {
    case 'success':
      setModalContent(<ModalSucesso message={message} onClose={fecharModal} />);
      break;
    case 'error':
      setModalContent(<ModalErro message={message} onClose={fecharModal} />);
      break;
      case 'confirmation':
        setModalContent(
          <ModalConfirmacao
            message={message}
            onConfirm={(id) => excluirAluno(id)}
            onCancel={fecharModal}
            id={aluno}
          />
        );
        break;
      
    default:
      break;
  }
  setShowModal(true);
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
                <button onClick={() => editarAluno(aluno.id)} title="Editar registro do aluno">Editar</button>
                <button onClick={() => confirmarExclusao(aluno.id)} title="Excluir registro do aluno">Excluir</button>
                {/* <button onClick={() => visualizarDetalhes(aluno.id)} title="Visualizar detalhes do aluno">Detalhes</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          {/* Renderização condicional do modal de confirmação */}
          {showModal && (
        <ModalConfirmacao
          message="Tem certeza que deseja excluir este aluno?"
          onConfirm={excluirAluno}
          onCancel={fecharModal}
        />
      )}
      </div>
      <Footer />
    </div>
  );
}

export default ListarAlunos;
