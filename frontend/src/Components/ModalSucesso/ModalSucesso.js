import React from 'react';

const ModalSucesso = ({ message, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content success">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Sucesso!</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ModalSucesso;
