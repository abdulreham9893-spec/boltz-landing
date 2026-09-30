<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

// Honeypot: real visitors never fill this hidden field
if (!empty($_POST['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

$name    = trim((string)($_POST['name'] ?? ''));
$email   = trim((string)($_POST['email'] ?? ''));
$message = trim((string)($_POST['message'] ?? ''));

// Prevent email header injection
$name = preg_replace('/[\r\n\t]+/u', ' ', $name) ?? $name;

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please fill in all fields.']);
    exit;
}

if (mb_strlen($name) > 100 || mb_strlen($email) > 254 || mb_strlen($message) > 5000) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Input is too long.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

// Where notifications are delivered — change this to your Hostinger email if you prefer
$to = 'helloboltz@gmail.com';

$subject = 'New project inquiry - ' . $name;
$body  = "New message from your website contact form.\n\n";
$body .= "Name:  {$name}\n";
$body .= "Email: {$email}\n\n";
$body .= "Message:\n{$message}\n";

$fromDomain = $_SERVER['HTTP_HOST'] ?? 'localhost';
$headers  = "From: Boltz Website <no-reply@{$fromDomain}>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = @mail($to, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not send your message. Please email helloboltz@gmail.com directly.']);
}
