<?php

function writeToLog($data)
{
    $file = '../logs.txt';
    $content = date('Y-m-d H:i:s') . ' - ' . print_r($data, true) . PHP_EOL;
    file_put_contents($file, $content, FILE_APPEND);
}

ini_set('SMTP', 'localhost');
ini_set('smtp_port', 1025);


try {
    $email = $_POST['email'];
    $raison = $_POST['raison'];
    $message = $_POST['text'];

    $destinataire = "Thoma.zadikian@gmail.com";

    $sujet = $raison;

    $corps_message = $message;

    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";

    mail($destinataire, $sujet, $corps_message, $headers);

    $response = array(
        'status' => 'success',
        'message' => 'Le formulaire a été soumis avec succès !'
    );
} catch (Exception $e) {
    $response = array(
        'status' => 'error',
        'message' => 'Une erreur est survenue lors de l\'envoi du formulaire. Merci de contacter un administrateur.'
    );
    writeToLog("Erreur lors du traitement du formulaire : " . $e->getMessage());
}

header('Content-Type: application/json');
echo json_encode($response);
