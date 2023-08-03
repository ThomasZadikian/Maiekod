const nodemailer = require("nodemailer");

const handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const email = data.email;
    const raison = data.raison;
    const message = data.text;

    // Créez un transporteur SMTP réutilisable à l'aide des informations d'authentification fournies
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "thoma.zadikian@gmail.com", // Votre adresse e-mail
        pass: "hL2CYgSKdvJQUrbE", // Votre mot de passe
      },
    });

    // Configuration du message
    let mailOptions = {
      from: email,
      to: "thoma.zadikian@gmail.com", // L'adresse e-mail du destinataire
      subject: raison,
      text: message,
    };

    // Envoyer l'e-mail avec le transporteur défini
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "E-mail envoyé avec succès!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur lors de l'envoi de l'e-mail" }),
    };
  }
};

module.exports = { handler };
