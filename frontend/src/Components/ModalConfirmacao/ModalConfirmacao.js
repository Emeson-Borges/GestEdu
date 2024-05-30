// ModalConfirmacao.js

import React from 'react';
import './ModalConfirmacao.css';

const ModalConfirmacao = ({ message, onConfirm, onCancel, id }) => {
  const handleConfirm = () => {
    onConfirm(id);
  };

  return (
    <div className="modal">
      <div className="modal-content confirmation">
        <h2>Confirmação</h2>
        <p>{message}</p>
        <div className="buttons">
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;
