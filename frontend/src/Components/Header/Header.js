// Header.js
import React from 'react';
import styles from './Header.module.css'; // Importe as classes CSS com o nome correto

import logo from './image/GestEduuu.png';  // Importe a imagem
import { CiCircleList } from "react-icons/ci";

//Icons 
import { BiEdit, BiTrash,  BiHome   } from 'react-icons/bi';
import { FcReadingEbook, FcReading,  FcPlus, FcPlanner, FcViewDetails, FcAlarmClock, FcGraduationCap    } from "react-icons/fc";
import { DiApple } from "react-icons/di";

import { BsPersonAdd, BsPersonLinesFill, BsPersonVideo2, BsPersonRolodex, BsPostcard } from "react-icons/bs";
// import { BsPersonLinesFill } from "react-icons/bs";


function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
      <img src={logo} alt="GestEdu" className={styles.logo} />
        {/* <h1>GestEdu</h1> */}
        {/* <p>Sistema de Gestão Escolar</p> */}
      </div>
      <nav className={styles.menu}>
        <ul className={styles.menuItems}>
          <li className={styles.menuItem}>
            <a href="/"><BiHome /> Início</a>
          </li>
          <li className={styles.menuItem}>
            <a href="/"><FcReading /> Alunos</a>
            {/* Adicione o submenu */}
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
            {/* Adicione o submenu */}
            <ul className={styles.submenu}>
              <li className={styles.submenuItem}>
                <a href="/">Lista de Professores <FcViewDetails /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Cadastrar Professor <FcPlus /></a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Horários de Aula <FcAlarmClock  /></a>
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
            {/* Adicione o submenu */}
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
            <a href="/"><DiApple /> Disciplinas</a>
            {/* Adicione o submenu */}
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
            {/* Adicione o submenu */}
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
            {/* Adicione o submenu */}
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
          {/* Adicione mais itens de menu conforme necessário */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
