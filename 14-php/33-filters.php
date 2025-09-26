<?php
$title = '33 - Filters';
$description = 'Sanitize and validate data with PHP filters.';
include 'template/header.php';

echo '<section>';
$email = 'test@example.com';
$sanitized = filter_var($email, FILTER_SANITIZE_EMAIL);
$isValid = filter_var($sanitized, FILTER_VALIDATE_EMAIL);

echo '<h2>Email Filter</h2>';
echo '<p>Original: ' . $email . '</p>';
echo '<p>Sanitized: ' . $sanitized . '</p>';
echo '<p>Valid: ' . ($isValid ? 'Yes' : 'No') . '</p>';
echo '</section>';

include 'template/footer.php';