import React, { useState } from 'react';
import axios from 'axios';

import './Users.css';

function CadastroUsuario() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    cpf: '',
    profilePicture: null,
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;
    setUserData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await axios.post('http://localhost:8000/api/cadastrar-usuario/', formData);
      // Redirecionar ou exibir uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      // Exibir uma mensagem de erro
    }
  };

  return (
    <div className="cadastro-usuario-container">
      <h2>Cadastrar Usuário</h2>
      <form onSubmit={handleSubmit} className="cadastro-usuario-form">
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={userData.email} 
          onChange={handleChange} 
          required 
          className="cadastro-input"
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Senha" 
          value={userData.password} 
          onChange={handleChange} 
          required 
          className="cadastro-input"
        />
        <input 
          type="text" 
          name="firstName" 
          placeholder="Primeiro Nome" 
          value={userData.firstName} 
          onChange={handleChange} 
          required 
          className="cadastro-input"
        />
        <input 
          type="text" 
          name="lastName" 
          placeholder="Último Nome" 
          value={userData.lastName} 
          onChange={handleChange} 
          required 
          className="cadastro-input"
        />
        <input 
          type="date" 
          name="dateOfBirth" 
          placeholder="Data de Nascimento" 
          value={userData.dateOfBirth} 
          onChange={handleChange} 
          className="cadastro-input"
        />
        <input 
          type="text" 
          name="cpf" 
          placeholder="CPF" 
          value={userData.cpf} 
          onChange={handleChange} 
          className="cadastro-input"
        />
        <input 
          type="file" 
          name="profilePicture" 
          accept="image/*" 
          onChange={handleChange} 
          className="cadastro-input"
        />
        <input 
          type="text" 
          name="phoneNumber" 
          placeholder="Telefone" 
          value={userData.phoneNumber} 
          onChange={handleChange} 
          className="cadastro-input"
        />
        <button type="submit" className="cadastro-submit-btn">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroUsuario;
