import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListarTurma.css';
import Header from '../../../Components/Header/Header.js';
import Footer from '../../../Components/Footer/Footer.js';
import  '../../../Components/Header/Header.module.css';
import '../../../Components/Footer/Footer.module.css';

import ModalSucesso from '../../../Components/ModalSucesso/ModalSucesso';
import ModalErro from '../../../Components/ModalErro/ModalErro';
import ModalConfirmacao from '../../../Components/ModalConfirmacao/ModalConfirmacao.js';

//Icons 
import { BiEdit, BiTrash, BiChevronRight, BiChevronLeft  } from 'react-icons/bi';
import { RiFileList3Line, RiPrinterLine, RiFileExcel2Line, RiAddLine, RiFilterFill, RiFormatClear } from 'react-icons/ri';



// Funções 
import { imprimirLista } from '../../../Components/Funcoes/Funcoes.js';

function ListarTurmas() {
  const [turmas, setTurmas] = useState([]);
  const [filtroPeriodo, setFiltroPeriodo] = useState('');
  const [filtroAno, setFiltroAno] = useState('');
  const [filtroNome, setFiltroNome] = useState('');
  const [turmasFiltradas, setTurmasFiltradas] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);


  useEffect(() => {
    const fetchTurmas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cursos/listaturma/');
        setTurmas(response.data);
        console.log(response.data)
        console.log('Turmas:', response.data); 
        setNextPageUrl(response.data.next); // Atualiza a URL da próxima página
        setPrevPageUrl(response.data.previous); // Atualiza a URL da página anterior
      } catch (error) {
        console.error('Erro ao buscar turmas:', error);
      }
    };

    fetchTurmas();
  }, []);

  const loadNextPage = async () => {
    try {
      const response = await axios.get(nextPageUrl);
      setTurmas(response.data); // Define os dados da próxima página
      setNextPageUrl(response.data.next); // Atualiza a URL da próxima página
      setPrevPageUrl(response.data.previous); // Atualiza a URL da página anterior
    } catch (error) {
      console.error('Erro ao carregar próxima página de turmas:', error);
    }
  };
  
  
  
  const loadPrevPage = async () => {
    try {
      const response = await axios.get(prevPageUrl);
      setTurmas(response.data); // Define os dados da página anterior
      setNextPageUrl(response.data.next); // Atualiza a URL da próxima página
      setPrevPageUrl(response.data.previous); // Atualiza a URL da página anterior
    } catch (error) {
      console.error('Erro ao carregar página anterior de turmas:', error);
    }
  };
  
  
  
  const editarTurma = (id) => {
    // Lógica para redirecionar para a página de edição da turma com o ID especificado
  };

  const visualizarDetalhes = () => {
    // Lógica para visualizar detalhes da turma
  };

  const exportarCSV = () => {
    let csv = 'Nome,Ano Letivo,Período,Sala,Professor Responsável,Coordenador do Curso,Email Coordenador\n';

    turmas.forEach(turma => {
      csv += `${turma.nome},${turma.ano_letivo},${turma.periodo},${turma.sala},${turma.professor_responsavel},${turma.coord_curso},${turma.email_coord}\n`;
    });

    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = window.URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvUrl;
    tempLink.setAttribute('download', 'turmas.csv');
    document.body.appendChild(tempLink);
    tempLink.click();
  };

  const imprimir = () => {
    imprimirLista(turmas);
  };

  const adicionarNovaTurma = () => {
    // Implementação da função de adicionar nova turma
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
            // id={id}
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
    setTurmaSelecionada(null);
  };

  const confirmarExclusao = (id) => {
    if (id !== null && id !== undefined) {
      setTurmaSelecionada(id);
      openModal({
        type: 'confirmation',
        message: 'Tem certeza que deseja excluir esta turma?',
        // id,
        callback: () => excluirTurma(id)
      });
    } else {
      console.error('ID da turma não definido:', id);
    }
  };

  const excluirTurma = async (id) => {
    if (id !== null && id !== undefined) {
      try {
        await axios.delete(`http://localhost:8000/api/turmas/${id}/`);
        setTurmas(turmas.filter(turma => turma.id !== id));
        openModal({ type: 'success', message: 'Turma excluída com sucesso!' });
      } catch (error) {
        console.error('Erro ao excluir turma:', error);
        openModal({ type: 'error', message: 'Ocorreu um erro ao tentar excluir a turma. Tente novamente.' });
      }
    } else {
      console.error('ID da turma não definido:', id);
    }
  };

  const filtrarTurmas = async () => {
    // try {
    //   const response = await axios.get('http://localhost:8000/api/filtrar_turmas/', {
    //     params: {
    //       ano_letivo: filtroAno || undefined,
    //       nome: filtroNome || undefined,
    //       periodo: filtroPeriodo || undefined
    //     }
    //   });
    //   setTurmasFiltradas(response.data);
    // } catch (error) {
    //   console.error('Erro ao filtrar turmas:', error);
    // }
  };

  const limparFiltros = () => {
    setFiltroAno('');
    setFiltroNome('');
    setFiltroPeriodo('');
    filtrarTurmas();
  };

  useEffect(() => {
    filtrarTurmas();
  }, [filtroAno, filtroNome, filtroPeriodo]);


  return (
    <div>
    <div>
      <Header />
    </div>
    <div class="Listar-Turmas">
  <h1>Listagem de Turmas</h1>

  <div class='edit-search'>
    <input type="text" value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} placeholder="Filtrar por nome" />
    <input type="text" value={filtroAno} onChange={(e) => setFiltroAno(e.target.value)} placeholder="Filtrar por ano letivo" />
    <input type="text" value={filtroPeriodo} onChange={(e) => setFiltroPeriodo(e.target.value)} placeholder="Filtrar por período" />
  </div> 
  <div class='buttom-search'>
    <button onClick={filtrarTurmas}><RiFilterFill /> Filtrar</button>
    <button onClick={limparFiltros}><RiFormatClear /> Limpar Filtros</button>
  </div>

  <table class='tabela-coluna-turma'>

    <thead>

      <tr>
        <th>Nome</th>
        <th>Ano Letivo</th>
        <th>Período</th>
        <th>Sala</th>
        <th>Professor Responsável</th>
        <th>Coordenador do Curso</th>
        <th>Email Coordenador</th>
        <th>Ações</th>
      </tr>
    </thead>
    
        <tbody class='tabela-dados-turma'>

        {Array.isArray(turmas.results) && turmas.results.map((turma) => (
            <tr key={turma.id}>
            <td>{turma.nome}</td>
            <td>{turma.ano_letivo}</td>
            <td>{turma.periodo}</td>
            <td>{turma.sala}</td>
            <td>{turma.professor_responsavel}</td>
            <td>{turma.coord_curso}</td>
            <td>{turma.email_coord}</td>
            <td class='btn-acoes-tabela'>
                <button onClick={() => editarTurma(turma.id)} title="Editar registro da turma"><BiEdit /></button>
                <button onClick={() => confirmarExclusao(turma.id)} title="Excluir registro da turma"><BiTrash /></button>
                <button onClick={() => visualizarDetalhes(turma.id)} title="Visualizar detalhes da turma"><RiFileList3Line /></button>
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
          <button onClick={exportarCSV} title="Exportar para CSV"><RiFileExcel2Line /> Exportar para CSV</button>
          <button onClick={imprimir} title="Imprimir Lista"><RiPrinterLine /> Imprimir Lista</button>
          <button onClick={adicionarNovaTurma} title="Adicionar Nova Turma"><RiAddLine /> Nova Turma</button>
        </div>
      </div>
      {modalContent}
      <Footer />
    </div>
    
  );
}


export default ListarTurmas;
