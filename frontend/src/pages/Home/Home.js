// src/pages/Home/Home.js
import React from 'react';
import Header from '../../Components/Header/Header.js';
import Footer from '../../Components/Footer/Footer.js';
import styles from '../../Components/Header/Header.module.css';
import '../../Components/Footer/Footer.module.css';

import './Home.css';
import EscolaImage from './image/escola/R.jpeg'; 

function Home() {
  return (
    <div>
      <div>
      <Header />
      </div>
    <div className="home">
        
      <main className="home-main">
        <section className="home-section">
          <div>
            <h2>Espaço Escolar</h2>
            <p>
              Bem-vindo ao GestEdu, o sistema de gestão escolar mais avançado do mercado. 
              Nossa missão é fornecer soluções eficazes para simplificar a administração 
              de escolas, permitindo que você se concentre no que realmente importa: a educação.
            </p>
          </div>
          {/* Adicione a imagem da escola */}
          <img src={EscolaImage} alt="Escola" className="escola-image" />          
        </section>
        {/* Adicione mais seções conforme necessário */}
      </main>
      <Footer />
      </div>
    </div>
  );
}

export default Home;
