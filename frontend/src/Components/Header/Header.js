// Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importe o axios para fazer a chamada à API
import styles from './Header.module.css'; // Importe as classes CSS com o nome correto

import logo from './image/GestEduuu.png';  // Importe a imagem
import defaultProfilePic from './image/imgpadraoperfil.png';

// Icons 
import { BiHome, BiLogOutCircle, BiCog } from 'react-icons/bi';
import { CiCircleList } from 'react-icons/ci';
import { FcReadingEbook, FcReading, FcPlus, FcPlanner, FcViewDetails, FcAlarmClock, FcGraduationCap } from "react-icons/fc";
import { BsPersonAdd, BsPersonLinesFill, BsPersonVideo2, BsPersonRolodex, BsPostcard, BsJournalMedical } from "react-icons/bs";

function Header() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user-profile/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setProfilePicUrl(response.data.profile_image_url); // Ajuste o campo conforme necessário
      } catch (error) {
        console.error('Erro ao buscar dados do perfil do usuário:', error);
        setProfilePicUrl(defaultProfilePic);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <img src={logo} alt="GestEdu" className={styles.logo} />
      </div>
      <nav className={styles.menu}>
        <ul className={styles.menuItems}>
          <li className={styles.menuItem}>
            <a href="/"><BiHome /> Início</a>
          </li>
          <li className={styles.menuItem}>
            <a href="/"><FcReading /> Alunos</a>
            <ul className={styles.submenu}>
              <li className={styles.submenuItem}>
                <a href="/listar-alunos">Lista de Alunos <BsPersonLinesFill /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/cadastrar-aluno">Matricular Aluno <BsPersonAdd /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Notas e Avaliações <BsPersonRolodex /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Presença <BsPersonVideo2 /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Relatórios de Desempenho <BsPostcard /></a>
              </li>
            </ul>
          </li>
          <li className={styles.menuItem}>
            <a href="/"><FcReadingEbook />Professores</a>
            <ul className={styles.submenu}>
              <li className={styles.submenuItem}>
                <a href="/">Lista de Professores <FcViewDetails /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Cadastrar Professor <FcPlus /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Horários de Aula <FcAlarmClock /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Atribuições de Turmas</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Relatórios de Atividades</a>
              </li>
            </ul>
          </li>
          <li className={styles.menuItem}>
            <a href="/"><FcGraduationCap /> Turmas</a>
            <ul className={styles.submenu}>
              <li className={styles.submenuItem}>
                <a href="/add-curso">Adicionar Curso <FcPlus /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/cursos-list">Lista de Cursos <FcViewDetails /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/turma-list-create">Adicionar Turma <FcPlus /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/turma-list">Listar Turma <FcViewDetails /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Horários das Aulas</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Alocação de Salas</a>
              </li>
            </ul>
          </li>
          <li className={styles.menuItem}>
            <a href="/"><BsJournalMedical /> Disciplinas</a>
            <ul className={styles.submenu}>
              <li className={styles.submenuItem}>
                <a href="/">Lista de Disciplinas</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Adicionar Disciplina <FcPlus /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Plano de Ensino</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Material de Aula</a>
              </li>
            </ul>
          </li>
          <li className={styles.menuItem}>
            <a href="/"><CiCircleList /> Relatórios</a>
            <ul className={styles.submenu}>
              <li className={styles.submenuItem}>
                <a href="/">Relatórios Gerais</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Relatórios de Alunos</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Relatórios de Professores</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Relatórios de Turmas</a>
              </li>
            </ul>
          </li>
          <li className={styles.menuItem}>
            <a href="/"><FcPlanner /> Calendário</a>
            <ul className={styles.submenu}>
              <li className={styles.submenuItem}>
                <a href="/">Eventos Escolares</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Feriados</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Calendário Acadêmico</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className={styles.profile}>
        <img src={profilePicUrl} alt="Profile" className={styles.profilePic} onClick={toggleDropdown} />
        {showDropdown && (
          <ul className={styles.dropdownMenu}>
            <li className={styles.dropdownItem}>
              <a href="/user_data"><BiCog /> Configurações</a>
            </li>
            <li className={styles.dropdownItem} onClick={handleLogout}>
              <BiLogOutCircle /> Sair
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}

export default Header;
