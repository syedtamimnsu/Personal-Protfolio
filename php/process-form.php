<?php
header('Content-Type: application/json');

function fail($msg)
{
    echo json_encode(['success' => false, 'message' => $msg]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    fail('Invalid request.');
}

$to = 'syedtamim167@gmail.com';

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    fail('All fields are required.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('Please enter a valid email address.');
}

$email_subject = "Portfolio Contact: $subject";
$email_body = "Name: $name\nEmail: $email\n\n$message";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type:text/plain;charset=UTF-8\r\n";
$headers .=
    'From: Portfolio <no-reply@' .
    ($_SERVER['HTTP_HOST'] ?? 'localhost') .
    ">\r\n";
$headers .= "Reply-To: $email\r\n";

$sent = mail($to, $email_subject, $email_body, $headers);

if (!$sent) {
    fail('Server mail() failed. Hosting may block email sending.');
}

echo json_encode([
    'success' => true,
    'message' => 'Message sent successfully!',
]);
