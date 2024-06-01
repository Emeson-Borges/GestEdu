import React, { useState } from 'react';
import axios from 'axios';
import Header from '../../../Components/Header/Header.js';
import Footer from '../../../Components/Footer/Footer.js';
import styles from './AddTurma.module.css';

import ModalSucesso from '../../../Components/ModalSucesso/ModalSucesso';
import ModalErro from '../../../Components/ModalErro/ModalErro';
import ModalConfirmacao from '../../../Components/ModalConfirmacao/ModalConfirmacao.js';

//Icons 
import { BiPrinter } from 'react-icons/bi';
import { IoMdMail } from 'react-icons/io';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { RiFileList3Line, RiPrinterLine, RiFileExcel2Line, RiAddLine, RiFilterFill, RiFormatClear } from 'react-icons/ri';

const AddTurma = () => {
  const [turmaData, setTurmaData] = useState({
    nome: '',
    ano_letivo: '',
    periodo: '',
    sala: '',
    professor_responsavel: '',
    coord_curso: '',
    email_coord: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurmaData({ ...turmaData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/cursos/addturmas/', turmaData);
      alert('Turma cadastrada com sucesso!');
      // Limpar os campos após o envio bem-sucedido
      setTurmaData({
        nome: '',
        ano_letivo: '',
        periodo: '',
        sala: '',
        professor_responsavel: '',
        coord_curso: '',
        email_coord: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar turma:', error);
      alert('Erro ao cadastrar turma. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <div>
        <Header />
      </div>
    <div className={styles.container}>
      <h1>Cadastrar Turma</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="nome" value={turmaData.nome} onChange={handleChange} placeholder="Nome da turma" />
        <input type="number" name="ano_letivo" value={turmaData.ano_letivo} onChange={handleChange} placeholder="Ano letivo" />
        <select name="periodo" value={turmaData.periodo} onChange={handleChange}>
          <option value="">Selecione o período</option>
          <option value="Integral">Integral</option>
          <option value="Manha">Manhã</option>
          <option value="Tarde">Tarde</option>
          <option value="Noite">Noite</option>
        </select>
        <input type="text" name="sala" value={turmaData.sala} onChange={handleChange} placeholder="Sala" />
        <input type="text" name="professor_responsavel" value={turmaData.professor_responsavel} onChange={handleChange} placeholder="Professor responsável" />
        <input type="text" name="coord_curso" value={turmaData.coord_curso} onChange={handleChange} placeholder="Coordenador do curso" />
        <input type="email" name="email_coord" value={turmaData.email_coord} onChange={handleChange} placeholder="Email do coordenador" />
        <button type="submit">Salvar</button>
      </form>
    </div>
      <Footer />
    </div>
  );
};

export default AddTurma;
