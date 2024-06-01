// funcoes.js

export const imprimirLista = (alunos) => {
    const janelaImpressao = window.open('', '_blank');
    
    const conteudoImpressao = `
      <html>
        <head>
          <title>Lista de Alunos</title>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>Lista de Alunos</h1>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Turma</th>
                <th>Ano</th>
                <th>Matrícula</th>
              </tr>
            </thead>
            <tbody>
              ${alunos.map(aluno => `
                <tr>
                  <td>${aluno.nome}</td>
                  <td>${aluno.turma}</td>
                  <td>${aluno.anoMatricula}</td>
                  <td>${aluno.matricula}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
  
    janelaImpressao.document.write(conteudoImpressao);
    janelaImpressao.document.close();
    janelaImpressao.print();
  };
  