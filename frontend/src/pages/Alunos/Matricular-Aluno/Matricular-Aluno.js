import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Matricular-Aluno.css';
import Header from '../../../Components/Header/Header.js';
import Footer from '../../../Components/Footer/Footer.js';
import InputMask from 'react-input-mask';
import ConfirmarDados from '../../../Components/ConfirmaDados/ConfirmaDados.js';

function MatricularAluno() {
  const navigate = useNavigate(); // Hook de navegação do react-router-dom

  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
    sexo: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    pais: '',
    foto: null,
    observacoes: '',
    cep: '',
    cpf: '',
    curso: ''
  });

  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState({});
  const [cursos, setCursos] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para controlar a exibição do componente de confirmação

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/cursos/listar/');
        setCursos(response.data);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    };
    fetchCursos();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto') {
        setFormData({
            ...formData,
            foto: files[0]
        });
    } else {
        setFormData({
            ...formData,
            [name]: value
        });
    }
  };

  const handleCPFChange = (e) => {
    const { name, value } = e.target;
    // Remove todos os caracteres não numéricos do CPF, mantendo apenas os números
    const cpf = value.replace(/\D/g, '');
    // Atualiza o estado do formulário com o CPF formatado
    setFormData((prevState) => ({
      ...prevState,
      [name]: cpf,
    }));
  };

  const handleMaskCEPChange = async (e) => {
    let cep = e.target.value.replace(/\D/g, '');
    setFormData((prevState) => ({
      ...prevState,
      cep,
    }));

    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const { data } = response;
        setFormData((prevState) => ({
          ...prevState,
          endereco: data.logradouro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
          pais: 'Brasil',
        }));
      } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Botão Matricular clicado");
    setShowModal(true); // Abrir o modal ao clicar em "Matricular"
    // e.preventDefault();
    
    // const data = new FormData();
    // Object.keys(formData).forEach((key) => {
    //     if (key === 'foto' && formData[key] === null) {
    //         // Não adiciona o campo 'foto' se for null
    //         return;
    //     }
    //     data.append(key, formData[key]);
    // });

    // try {
    //     const response = await axios.post('http://localhost:8000/api/matricular/', data, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    //     console.log('Aluno matriculado com sucesso:', response.data);

    //      // Exibe o modal ao enviar com sucesso
    //      setShowModal(true);
    // } catch (error) {
    //     console.error('Erro ao matricular aluno:', error);
    //     if (error.response) {
    //         // Servidor respondeu com um status diferente de 2xx
    //         console.error('Resposta do servidor:', error.response.data);
    //     }
    // }
    
};

const handleConfirm = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/matricular/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log('Aluno matriculado com sucesso:', response.data);
    
    // Limpar o formulário após o envio bem-sucedido (opcional)
    setFormData({
      nome: '',
      data_nascimento: '',
      sexo: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      pais: '',
      foto: null,
      observacoes: '',
      cep: '',
      cpf: '',
      curso: ''
    });

    // Fechar o modal após enviar os dados
    setShowModal(false);

    // Redirecionar para a página de listagem de alunos
    navigate('/listar-alunos');
  } catch (error) {
    console.error('Erro ao matricular aluno:', error);
    if (error.response) {
      // Servidor respondeu com um status diferente de 2xx
      console.error('Resposta do servidor:', error.response.data);
    }
    // Aqui você pode adicionar manipulação de erros adicional, se necessário
  }
};


const handleCorrigir = () => {
  // Fecha o modal ao clicar em "Corrigir"
  setShowModal(false);
};


  return (
    <div>
      <div>
       <Header />
      </div>
      <h1>Matricular Aluno</h1>
      <form className="matricular-aluno-form" onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Renderizar mensagens de erro */}
        {Object.keys(errors).map((key) => (
          <div key={key} className="error-message">{errors[key]}</div>
        ))}


            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
            <label htmlFor="data_nascimento">Data de Nascimento:</label>
            <input type="date" id="data_nascimento" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} required />
            <label htmlFor="sexo">Sexo:</label>
            <select id="sexo" name="sexo" value={formData.sexo} onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            <label htmlFor="telefone">Telefone:</label>
            <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />

            <label htmlFor="cep">CEP:</label>
            <InputMask
              type="text"
              id="cep"
              name="cep"
              mask="99999-999" 
              value={formData.cep}
              onChange={handleMaskCEPChange}
              required
            />
            <label htmlFor="endereco">Endereço:</label>
            <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} />
            <label htmlFor="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} />

            <label htmlFor="estado">Estado:</label>
            <input type="text" id="estado" name="estado" value={formData.estado} onChange={handleChange} />

            <label htmlFor="pais">País:</label>
            <input type="text" id="pais" name="pais" value={formData.pais} onChange={handleChange} />

            <label htmlFor="cpf">CPF:</label>
            <InputMask
              type="text"
              id="cpf"
              name="cpf"
              mask="999.999.999-99" 
              value={formData.cpf}
              onChange={handleCPFChange}
              required
            />

            <label htmlFor="curso">Curso:</label>
            <select id="curso" name="curso" value={formData.curso} onChange={handleChange} required>
              <option value="">Selecione</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>{curso.nome}</option>
              ))}
            </select>

            <label htmlFor="foto">Foto:</label>
            <input type="file" id="foto" name="foto" onChange={handleChange} />

            <label htmlFor="observacoes">Observações:</label>
            <textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleChange}></textarea>

          <button type="submit" className="matricular-button">Matricular</button>
          <Link to="/listar-alunos" className="cancelar-button">Cancelar</Link>

      </form>
        {/* Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <ConfirmarDados formData={formData} />
              <div className='btn-confirmar-dados'>
                <button onClick={handleConfirm}>Confirmar</button>
              </div>
              <div className='btn-corrigir-dados'>
                <button onClick={handleCorrigir}>Corrigir</button>
              </div>
            </div>
          </div>
        )}
      <div>
       <Footer />
      </div>
    </div>
  );
}

export default MatricularAluno;

