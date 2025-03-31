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
                <div className={styles.logo}>
                    <img src={logo} alt="Logo" className={styles.logoImg} />
                </div>
            </header>
            <main className={styles.mainContent}>
                <h2>{isRegistered ? 'Verificar Cuenta' : 'Registro'}</h2>
                {!isRegistered ? (
                    <form className={styles.registerForm} onSubmit={handleRegister}>
                        <input id="firstName" type="text" placeholder="Nombre" value={formData.firstName} onChange={handleChange} required />
                        <input id="lastName" type="text" placeholder="Apellidos" value={formData.lastName} onChange={handleChange} required />
                        <input id="email" type="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required />
                        <input id="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
                        <button type="submit">Registrarse</button>
                    </form>
                ) : (
                    <div>
                        <p>Ingresa el código que recibiste por correo:</p>
                        <input type="text" placeholder="Código de verificación" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
                        <button onClick={handleVerifyToken}>Verificar</button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Register;
