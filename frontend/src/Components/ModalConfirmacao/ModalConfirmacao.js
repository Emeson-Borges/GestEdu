// ModalConfirmacao.js

import React from 'react';

const ModalConfirmacao = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content confirmation">
        <h2>Confirmação</h2>
        <p>{message}</p>
        <div className="buttons">
          <button onClick={onConfirm}>Confirmar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;
