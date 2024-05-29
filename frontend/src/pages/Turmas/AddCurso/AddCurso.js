import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AddCurso.css'; 
import Header from '../../../Components/Header/Header';
import Footer from '../../../Components/Footer/Footer';
import styles from '../../../Components/Header/Header.module.css';


function CadastrarCurso() {
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    nivel: '',
    duracao: '',
    preco: '',
    vagas_disponiveis: '',
    certificacao: false,
    pre_requisitos: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      preco: formData.preco === '' ? null : parseFloat(formData.preco),
      duracao: parseInt(formData.duracao),
      vagas_disponiveis: parseInt(formData.vagas_disponiveis),
      certificacao: formData.certificacao === 'true',
    };

    axios.post('http://localhost:8000/api/cursos/cadastrar/', dataToSend)
      .then((response) => {
        console.log(response.data);
        window.location.href = "/cursos-list";
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          const responseData = error.response.data;
          setErrors(responseData);
        } else {
          // Mensagem de erro genérica
        }
      });
  };

  return (
    <div>
    <div>
      <Header />
    </div>
    <div className="cadastrar-curso">
      <div className="form-container">
        <h1>Cadastrar Curso</h1>
        <form className="cadastrar-curso-form" onSubmit={handleSubmit}>
          {Object.keys(errors).map((key) => (
            <div key={key} className="error-message">{errors[key]}</div>
          ))}

          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="nivel">Nível:</label>
            <select id="nivel" name="nivel" value={formData.nivel} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Tec">Técnico</option>
              <option value="Sup">Superior</option>
              <option value="Tecn">Tecnólogo</option>
              <option value="Pos">Pós-Graduação</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="duracao">Duração em Semestres:</label>
            <input type="number" id="duracao" name="duracao" value={formData.duracao} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="preco">Preço:</label>
            <input type="number" id="preco" name="preco" value={formData.preco} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="vagas_disponiveis">Vagas Disponíveis:</label>
            <input type="number" id="vagas_disponiveis" name="vagas_disponiveis" value={formData.vagas_disponiveis} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="certificacao">Certificação:</label>
            <select id="certificacao" name="certificacao" value={formData.certificacao} onChange={handleChange}>
              <option value={false}>Não</option>
              <option value={true}>Sim</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="pre_requisitos">Pré-requisitos:</label>
            <textarea id="pre_requisitos" name="pre_requisitos" value={formData.pre_requisitos} onChange={handleChange}></textarea>
          </div>

          <div className="button-group">
            <button type="submit" className="btn cadastrar-button">Cadastrar</button>
            <Link to="/" className="btn cancelar-button">Cancelar</Link>
          </div>
        </form>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default CadastrarCurso;
