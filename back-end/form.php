<?php

ini_set('SMTP', 'localhost');
ini_set('smtp_port', 1025);

$email = $_POST['email'];
$raison = $_POST['raison'];
$message = $_POST['text'];

// Email du destinataire 
$destinataire = "Thoma.zadikian@gmail.com";

$sujet = $raison;

$corps_message = "Corps du message : \n" . $message;

// En-têtes de l'e-mail
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

if (mail($destinataire, $sujet, $corps_message, $headers) && mail($email, $sujet, $corps_message, $headers)) {
    echo "L'e-mail a été envoyé avec succès, je devriez avoir également reçu une copie de l'email sur la boîte mail correspondante";
} else {
    echo "Une erreur est survenue lors de l'envoi de l'e-mail. Merci de contacter un administrateur";
}
