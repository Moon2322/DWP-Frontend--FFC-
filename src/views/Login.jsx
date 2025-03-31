import React from 'react';
import styles from './../css/Login.module.css';
import logo from './../assets/FFC_logo.png'; 
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    const goToRegister = () => {
        navigate("/Register");
    };


    const handleLogin = async (event) => {
        event.preventDefault();
    
        const email = event.target.email.value;
        const password = event.target.password.value;
    
        try {
            const response = await fetch(`/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert("Inicio de sesión exitoso");
                localStorage.setItem("token", data.token); // Guardar el token en localStorage
                navigate("/Home");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error en el login:", error);
            alert("Error al iniciar sesión.");
        }
    };
    

    return (
                  <div className={styles.loginPage}>
                    <header className={styles.header}>
  <div className={styles.headerRight}>
    <a href="/Register" className={styles.createAccount}>CREAR CUENTA</a>
  </div>
  <div className={styles.logo}>
    <img src={logo} alt="Logo" className={styles.logoImg} />
  </div>
</header>

               <main className={styles.mainContent}>
                <h2>Iniciar sesión</h2>

                <form className={styles.loginForm} onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Correo electrónico</label>
                        <input id="email" type="email" placeholder="Ingresa tu correoooooooooo" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Contraseña</label>
                        <input id="password" type="password" placeholder="Ingresa tu contraseña" required />
                    </div>

                    <button type="submit" className={styles.continueButton}>Continuar</button>
                </form>

                <div className={styles.divider}>
                    <span>O</span>
                </div>

                <button className={styles.googleButton}>Continuar con Google</button>

                <p className={styles.helpText}>
                    ¿No puedes iniciar sesión?{' '}
                    <a href="/Forgot_password" style={{ cursor: 'pointer', color: '#1890ff' }}>
                        Recuperar contraseña
                    </a>
                </p>

                <p className={styles.registerLink}>
                    ¿No tienes una cuenta?{' '}
                    <a onClick={goToRegister} style={{ cursor: 'pointer', color: '#1890ff' }}>
                        Crear cuenta
                    </a>
                </p>
            </main>

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

export default Login;