import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import MatricularAluno from './pages/Alunos/Matricular-Aluno/Matricular-Aluno';
import ListarAlunos from './pages/Alunos/Lista-Alunos/Listar-Alunos';
import CadastrarCurso from './pages/Turmas/AddCurso/AddCurso';
import ListarCursos from './pages/Turmas/ListarCurso/ListarCurso';
import AddTurma from './pages/Turmas/AddTurma/AddTurma';
import ListarTurmas from './pages/Turmas/ListarTurma/ListarTurma';
import Login from './pages/Login/Login';
import PrivateRoute from './pages/Login/PrivateRoute';

const App = () => {
    return (
        
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastrar-aluno" element={<MatricularAluno />} />
                <Route path="/listar-alunos" element={<ListarAlunos />} />
                <Route path="/add-curso" element={<CadastrarCurso />} />
                <Route path="/cursos-list" element={<ListarCursos />} />
                <Route path="/turma-list-create" element={<AddTurma />} />
                <Route path="/turma-list" element={<ListarTurmas />} />
                <Route path="/login" element={<Login />} />
                {/* Adicione outras rotas aqui */}
            </Routes>
        </Router>
    );
};

export default App;
