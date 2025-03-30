import React from 'react';
import styles from './../Css/ForgotPassword.module.css'; 
import { useNavigate } from 'react-router-dom';
import logo from './../assets/FFC_logo.png'; 

function ForgotPassword() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes manejar la lógica para enviar el código
        console.log("Enviando código...");
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.forgotPasswordPage}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <button className={styles.backButton} onClick={handleGoBack}>Atrás</button>
                </div>
                <div className={styles.logo}>
                    <img src={logo} alt="Logo" className={styles.logoImg} />
                </div>
            </header>

            <main className={styles.mainContent}>
                <h2>¿Olvidaste tu contraseña?</h2>
                <p className={styles.instructions}>
                    Escribe la dirección de correo electrónico de tu cuenta y te enviaremos un mensaje para restablecer la contraseña.
                </p>

                <form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Ingresa tu correo"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>Enviar código</button>
                </form>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>Contacto: <a href="mailto:info@tudominio.com">info@tudominio.com</a></p>
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

export default ForgotPassword;