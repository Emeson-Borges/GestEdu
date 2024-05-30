import React from 'react';

const ConfirmarDados = ({ formData }) => {
    return (
        <div className="confirmar-dados">
            <h2>Confirme os Dados de Matrícula</h2>
            <div>
                <p><strong>Nome:</strong> {formData.nome}</p>
                <p><strong>Data de Nascimento:</strong> {formData.data_nascimento}</p>
                <p><strong>Sexo:</strong> {formData.sexo}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Telefone:</strong> {formData.telefone}</p>
                <p><strong>Endereço:</strong> {formData.endereco}</p>
                <p><strong>Cidade:</strong> {formData.cidade}</p>
                <p><strong>Estado:</strong> {formData.estado}</p>
                <p><strong>País:</strong> {formData.pais}</p>
                <p><strong>CEP:</strong> {formData.cep}</p>
                <p><strong>CPF:</strong> {formData.cpf}</p>
                <p><strong>Curso:</strong> {formData.curso}</p>
                {formData.foto && ( // Verifica se há uma foto selecionada
                    <div>
                        <strong>Foto:</strong> {/* Exibe a legenda apenas se houver foto */}
                        <img src={URL.createObjectURL(formData.foto)} alt="Foto selecionada" />
                    </div>
                )}
                <p><strong>Observações:</strong> {formData.observacoes}</p>
                {/* Adicione outros campos conforme necessário */}
            </div>
        </div>
    );
};

export default ConfirmarDados;

