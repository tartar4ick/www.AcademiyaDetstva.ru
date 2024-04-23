<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/Exception.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'PHPmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('adetstwa@yandex.ru');
$mail->addAddress('adetstwa@yandex.ru');
$mail->Subject = 'Запрос на консультацию';

$body = '<h1>Продайте мне абон, умоляю!)</h1>';

if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Имя:</strong>' . $_POST['name'] . '</p>';
}

if (trim(!empty($_POST['patronymic']))) {
    $body .= '<p><strong>Отчество:</strong> ' . $_POST['patronymic'] . '</p>';
}

if (trim(!empty($_POST['message']))) {
    $body .= '<p><strong>Сообщение:</strong> ' . $_POST['message'] . '</p>';
}

$mail->Body = $body;


if (!$mail->send()){
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';    
}

$responce = ['message' => $message];

header('Content-type: application/json');
echo json_encode($responce);

?>
