import React from 'react';

const ModalErro = ({ message, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content error">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Erro!</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ModalErro;
