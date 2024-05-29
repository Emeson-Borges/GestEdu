// Header.js
import React from 'react';
import styles from './Header.module.css'; // Importe as classes CSS com o nome correto

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1>GestEdu</h1>
        <p>Sistema de Gestão Escolar</p>
      </div>
      <nav className={styles.menu}>
        <ul className={styles.menuItems}>
          <li className={styles.menuItem}>
            <a href="/">Início</a>
          </li>
          <li className={styles.menuItem}>
            <a href="/">Alunos</a>
            {/* Adicione o submenu */}
            <ul className={styles.submenu}>
              <li className={styles.submenuItem}>
                <a href="/listar-alunos">Lista de Alunos</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/cadastrar-aluno">Matricular Aluno</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Notas e Avaliações</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Presença</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Relatórios de Desempenho</a>
              </li>
            </ul>
          </li>
          <li className={styles.menuItem}>
            <a href="/">Professores</a>
            {/* Adicione o submenu */}
            <ul className={styles.submenu}>
              <li className={styles.submenuItem}>
                <a href="/">Lista de Professores</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Cadastrar Professor</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Horários de Aula</a>
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
            <a href="/">Turmas</a>
            {/* Adicione o submenu */}
            <ul className={styles.submenu}>
              <li className={styles.submenuItem}>
                <a href="/add-curso">Adicionar Curso</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/cursos-list">Lista de Turmas</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Adicionar Turma</a>
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
            <a href="/">Disciplinas</a>
            {/* Adicione o submenu */}
            <ul className={styles.submenu}>
              <li className={styles.submenuItem}>
                <a href="/">Lista de Disciplinas</a>
              </li>
              <li className={styles.submenuItem}>
                <a href="/">Adicionar Disciplina</a>
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
            <a href="/">Relatórios</a>
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
            <a href="/">Calendário</a>
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
