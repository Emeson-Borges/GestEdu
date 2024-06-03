import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Listar-Alunos.css';
import Header from '../../../Components/Header/Header.js';
import Footer from '../../../Components/Footer/Footer.js';
import  '../../../Components/Header/Header.module.css';
import '../../../Components/Footer/Footer.module.css';

import ModalSucesso from '../../../Components/ModalSucesso/ModalSucesso';
import ModalErro from '../../../Components/ModalErro/ModalErro';
import ModalConfirmacao from '../../../Components/ModalConfirmacao/ModalConfirmacao.js';

// Icons
import { BiPrinter } from 'react-icons/bi';
import { IoMdMail } from 'react-icons/io';
import { RiFileList3Line, RiPrinterLine, RiFileExcel2Line, RiAddLine, RiFilterFill, RiFormatClear } from 'react-icons/ri';
import { BiEdit, BiTrash, BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { FcEmptyFilter } from "react-icons/fc";
import { BsFiletypeCsv, BsPersonAdd, BsFillPersonCheckFill } from "react-icons/bs";

// Funções
import { imprimirLista } from '../../../Components/Funcoes/Funcoes.js';

function ListarAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [filtroTurma, setFiltroTurma] = useState('');
  const [filtroAno, setFiltroAno] = useState('');
  const [filtroMatricula, setFiltroMatricula] = useState('');
  const [alunosFiltrados, setAlunosFiltrados] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);

  useEffect(() => {
    // Função para buscar alunos do servidor
    const fetchAlunos = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/api/alunos/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Mapeia os dados recebidos para incluir o ano da data de matrícula
        const alunosData = response.data.map(aluno => {
          const criadoEm = new Date(aluno.criado_em);
          const anoMatricula = criadoEm.getFullYear();
          return {
            ...aluno,
            anoMatricula // Adiciona o anoMatricula ao objeto aluno
          };
        });
        setAlunos(alunosData);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };

    // Chamada da função para buscar alunos quando o componente é montado
    fetchAlunos();
  }, []);

  const loadNextPage = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(nextPageUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAlunos(response.data.results); // Define os dados da próxima página
      setNextPageUrl(response.data.next); // Atualiza a URL da próxima página
      setPrevPageUrl(response.data.previous); // Atualiza a URL da página anterior
    } catch (error) {
      console.error('Erro ao carregar próxima página de alunos:', error);
    }
  };

  const loadPrevPage = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get(prevPageUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAlunos(response.data.results); // Define os dados da página anterior
      setNextPageUrl(response.data.next); // Atualiza a URL da próxima página
      setPrevPageUrl(response.data.previous); // Atualiza a URL da página anterior
    } catch (error) {
      console.error('Erro ao carregar página anterior de alunos:', error);
    }
  };

  const editarAluno = (id) => {
    // Lógica para redirecionar para a página de edição do aluno com o ID especificado
  };
  
  const visualizarDetalhes = () => {
    // Lógica para visualizar os detalhes de um aluno
  };

  const exportarCSV = () => {
    let csv = 'Nome,Turma,Ano,Matrícula\n';
    alunos.forEach(aluno => {
      csv += `${aluno.nome},${aluno.turma},${aluno.anoMatricula},${aluno.matricula}\n`;
    });
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvUrl;
    tempLink.setAttribute('download', 'alunos.csv');
    document.body.appendChild(tempLink);
    tempLink.click();
  };

  const imprimir = () => {
    imprimirLista(alunos);
  };

  const adicionarNovoAluno = () => {
    // Implementação da função de adicionar novo aluno
  };

  const openModal = ({ type, message, callback, id }) => {
    switch (type) {
      case 'success':
        setModalContent(<ModalSucesso message={message} onClose={fecharModal} />);
        setShowModal(true);
        setTimeout(() => {
          fecharModal();
        }, 2000);
        break;
      case 'error':
        setModalContent(<ModalErro message={message} onClose={fecharModal} />);
        setShowModal(true);
        break;
      case 'confirmation':
        setModalContent(
          <ModalConfirmacao
            message={message}
            onConfirm={callback}
            onCancel={fecharModal}
          />
        );
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  const fecharModal = () => {
    setShowModal(false);
    setModalContent(null);
    setAlunoSelecionado(null);
  };

  const confirmarExclusao = (id) => {
    if (id !== null && id !== undefined) {
      setAlunoSelecionado(id);
      openModal({
        type: 'confirmation',
        message: 'Tem certeza que deseja excluir este aluno?',
        callback: () => excluirAluno(id)
      });
    } else {
      console.error('ID do aluno não definido:', id);
    }
  };

  const excluirAluno = async (id) => {
    if (id !== null && id !== undefined) {
      try {
        const token = localStorage.getItem('access_token');
        await axios.delete(`http://localhost:8000/api/alunos/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAlunos(alunos.filter(aluno => aluno.id !== id));
        openModal({ type: 'success', message: 'Aluno excluído com sucesso!' });
      } catch (error) {
        console.error('Erro ao excluir aluno:', error);
        openModal({ type: 'error', message: 'Ocorreu um erro ao tentar excluir o aluno. Tente novamente.' });
      }
    } else {
      console.error('ID do aluno não definido:', id);
    }
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
        <button onClick={filtrarAlunos}><FcEmptyFilter /> Filtrar</button>
        <button onClick={limparFiltros}><RiFormatClear /> Limpar Filtros</button>
      </div>
      {/* Tabela de Alunos */}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Turma</th>
            <th>Ano</th>
            <th>Matrícula</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
             {alunos.map((aluno, index) => (
             <tr key={aluno.id}>
              <td> {index + 1} <BsFillPersonCheckFill /> </td>
              <td>{aluno.nome}</td>
              <td>{aluno.turma}</td>
              <td>{aluno.anoMatricula}</td>
              <td>{aluno.matricula}</td>
              <td>
                <button onClick={() => editarAluno(aluno.id)} title="Editar registro do aluno"><BiEdit /></button>
                <button onClick={() => confirmarExclusao(aluno.id)} title="Excluir registro do aluno"><BiTrash /></button>
                <button onClick={() => visualizarDetalhes(aluno.id)} title="Visualizar detalhes do aluno"><RiFileList3Line /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div class='pagination-buttons'>
            <div class='btn-LoadPrevPage'>
            <button onClick={() => loadPrevPage(prevPageUrl)} disabled={!prevPageUrl}><BiChevronLeft  /></button>
            </div>
            <div class='btn-LoadNextPage'>
            <button onClick={() => loadNextPage(nextPageUrl)} disabled={!nextPageUrl}><BiChevronRight /></button>
            </div>
        </div>

        {/* Botões de ação */}
        <div className="action-buttons">
          <button onClick={exportarCSV} title="Exportar para CSV"><BsFiletypeCsv /> Exportar para CSV</button>
          <button onClick={imprimir} title="Imprimir Lista"><RiPrinterLine /> Imprimir Lista</button>
          <button onClick={adicionarNovoAluno} title="Adicionar Novo Aluno"><BsPersonAdd /> Novo Aluno</button>
          {/* Outros botões de ação aqui */}
        </div>
      </div>
      {modalContent}
      <Footer />
    </div>
  );
}

export default ListarAlunos;
