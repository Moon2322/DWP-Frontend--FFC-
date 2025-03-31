import React, { useState } from 'react';
import styles from './../css/Register.module.css'; 
import { useNavigate } from 'react-router-dom';
import logo from './../assets/FFC_logo.png'; 

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [error] = useState('');
    const [isLoading] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/register`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Registro exitoso. Revisa tu correo para el código de verificación.");
                setIsRegistered(true);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error al registrar usuario.");
        }
    };

    const handleVerifyToken = async () => {
        try {
            const response = await fetch(`/api/verify`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, token: verificationCode }),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Cuenta verificada con éxito. Ahora puedes iniciar sesión.");
                navigate('/Login');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error al verificar el token.");
        }
    };
    
    
    


    return (
        <div className={styles.registerPage}>
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>Atrás</button>
                </div>
                <div className={styles.logo}>
                    <img src={logo} alt="Logo" className={styles.logoImg} />
                </div>
                <div className={styles.headerRight}>
                    <a href="/Login" className={styles.createAccount}>INICIAR SESIÓN</a>
                </div>
            </header>

            <main className={styles.mainContent}>
                <h2>{isRegistered ? 'Verificar Cuenta' : 'Registro'}</h2>
                
                {error && <div className={styles.errorMessage}>{error}</div>}

                {!isRegistered ? (
                    <form className={styles.registerForm} onSubmit={handleRegister}>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName">Nombre</label>
                            <input 
                                id="firstName" 
                                type="text" 
                                placeholder="Ingresa tu nombre" 
                                value={formData.firstName}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="lastName">Apellidos</label>
                            <input 
                                id="lastName" 
                                type="text" 
                                placeholder="Ingresa tus apellidos" 
                                value={formData.lastName}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Correo electrónico</label>
                            <input 
                                id="email" 
                                type="email" 
                                placeholder="Ingresa tu correo" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                id="password" 
                                type="password" 
                                placeholder="Ingresa tu contraseña" 
                                value={formData.password}
                                onChange={handleChange}
                                minLength="3"
                                required 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={styles.continueButton}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registrando...' : 'Continuar'}
                        </button>
                    </form>
                ) : (
                    <div className={styles.formGroup}>
                        <label htmlFor="verificationCode">Código de verificación</label>
                        <input 
                            type="text" 
                            placeholder="Ingresa el código" 
                            value={verificationCode} 
                            onChange={(e) => setVerificationCode(e.target.value)} 
                            required 
                        />
                        <button className={styles.continueButton} onClick={handleVerifyToken}>Verificar</button>
                    </div>
                )}

                <p className={styles.loginLink}>
                    ¿Ya tienes una cuenta?{' '}
                    <a onClick={() => navigate('/Login')} style={{ cursor: 'pointer', color: '#1890ff' }}>
                        Inicia sesión
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

export default Register;