import nodemailer from 'nodemailer';

const sendVerificationEmail = async (email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // O usa otro servicio como Outlook, Yahoo, etc.
            auth: {
                // eslint-disable-next-line no-undef
                user: process.env.EMAIL_USER, // Tu correo
                // eslint-disable-next-line no-undef
                pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación
            }
        });

        const mailOptions = {
            // eslint-disable-next-line no-undef
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Verificación de cuenta',
            text: `Tu código de verificación es: ${token}`,
            html: `<p>Tu código de verificación es: <strong>${token}</strong></p>`
        };

        await transporter.sendMail(mailOptions);
        console.log(`Correo de verificación enviado a ${email}`);
    } catch (error) {
        console.error('Error al enviar el correo de verificación:', error);
    }
};

export default sendVerificationEmail;
