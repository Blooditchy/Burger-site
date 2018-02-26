<?php 
    $name = $_POST['user-name'];
    $pay = $_POST['pay'];
    $message = $_POST['message'];

    $dusturb = $_POST['dont-disturb'];
    $disturb = isset($disturb) ? 'Нет' : 'Да';

    $mail_message = '
    <html>
        <head>
            <title>Заявка</title>
        </head>
        <body>
            <h2>Заказ</h2>
            <ul>
                <li>Имя: '. $name .'</li>
                <li>Способо обпалты: '. $pay .'</li>
                <li>Комментарий к заказу: '. $message .'</li>
                <li>Нужно ли перезванивать: '. $disturb .'</li>
            </ul>
        </body>
    </html>';

    $headers = "From: Администратор сайта <admin@lk.com>\r\n".
                "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n";
    $mail = mail('mail@mail.ru', 'Заказ', $mail_message, $headers);

    if ($mail) {
        echo 'done';
    }else{
        echo 'fail'
    }
?>

