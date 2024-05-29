// Footer.js

import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 Seu Site. Todos os direitos reservados.</p>
      <p>Desenvolvido por <a href="https://www.linkedin.com/in/emeson-borges-1539b3126/" target="_blank" rel="noopener noreferrer">Emeson Borges</a></p>
    </footer>
  );
}

export default Footer;
