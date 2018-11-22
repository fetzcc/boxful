<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';

$post_json = file_get_contents("php://input");
$post_data = json_decode($post_json, true);

$subject = 'Kontakt';

$text = '<p><b>Name</b>:' . $post_data['name'] . '</p>';
$text .= '<p><b>Kontakt (E-Mail oder Telefonnummer)</b>:' . $post_data['contact'] . '</p>';
$text .= '<p><b>Nachricht</b>:' . $post_data['message'] . '</p>';
$text .= '<p><b>Info</b>:' . $post_data['info'] . '</p>';

$log  = "Name: ".$post_data['name'].' - '.date("F j, Y, g:i a").PHP_EOL.
        "Kontakt: ".$post_data['contact'].PHP_EOL.
        "Info: ".$post_data['info'].PHP_EOL.
        "-------------------------".PHP_EOL;

file_put_contents('./log_'.date("j.n.Y").'.txt', $log, FILE_APPEND);

$mail = new PHPMailer(true);   

try {
  $mail->CharSet  = 'UTF-8';
  $mail->Encoding = 'base64';
  $mail->isMail();
  $mail->From     = 'noreply@fetz.cc';
  $mail->FromName = 'boxful.at';
  $mail->isHTML(); 
  $mail->addAddress('office@boxful.at');
  $mail->addCC('smotzart@yandex.ru');
  //$mail->addAddress('office@boxful.at');
  //$mail->addAddress('smotzart@yandex.ru');
  
  //Content                             
  $mail->Subject = $subject;
  $mail->Body    = $text;
  $mail->AltBody = $text;

  $mail->send();

  http_response_code(200);

} catch (Exception $e) {
  http_response_code(400);
  echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}

?>