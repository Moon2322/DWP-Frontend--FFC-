import React from 'react';
import styles from './../Css/Home.module.css'; 
import { useNavigate } from 'react-router-dom';
import logo from './../assets/FFC_logo.png'; 
import fighter1 from './../assets/stich.png';
import fighter2 from './../assets/shrek.png'; 
import fighter3 from './../assets/bob_esponja.png'; 
import Pelea from './../assets/pelea.jpeg'; 

function Home() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className={styles.homePage}>
            <header className={styles.header}>
                <div className={styles.navLeft}>
                    <a onClick={() => handleNavigation("/eventos")}>Eventos</a>
                    <a onClick={() => handleNavigation("/peleadores")}>Peleadores</a>
                </div>
                <div className={styles.logo}>
                    <img src={logo} alt="Logo" className={styles.logoImg} />
                </div>
                <div className={styles.navRight}>
                    <a onClick={() => handleNavigation("/rankings")}>Rankings</a>
                    <a onClick={() => handleNavigation("/login")}>Iniciar sesión</a>
                </div>
            </header>

            <div className={styles.heroImage}>
                <img src={Pelea} alt="Última pelea" className={styles.heroImg} />
                <div className={styles.heroText}>
                    <h2>Última pelea</h2>
                    <p>
                        En la emocionante última pelea, nuestros luchadores dieron todo en el cuadrilátero.
                        No te pierdas los highlights y los momentos más intensos de esta batalla épica.
                    </p>
                </div>
            </div>

            <div className={styles.fightersSection}>
                <h3>Peleadores más recientes</h3>
                <div className={styles.fightersGrid}>
                    <div className={styles.fighterCard}>
                        <img src={fighter1} alt="Peleador 1" className={styles.fighterImg} />
                        <p>Peleador 1</p>
                    </div>
                    <div className={styles.fighterCard}>
                        <img src={fighter2} alt="Peleador 2" className={styles.fighterImg} />
                        <p>Peleador 2</p>
                    </div>
                    <div className={styles.fighterCard}>
                        <img src={fighter3} alt="Peleador 3" className={styles.fighterImg} />
                        <p>Peleador 3</p>
                    </div>
                </div>
            </div>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                <p><a href="/Contacto">Contacto</a></p>
                <div className={styles.socialMedia}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </div>
                    <p>© {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;