<?php
$title = '31 - Send Mail';
$description = 'Send emails using PHP.';
include 'template/header.php';

echo '<section>';
echo '<h2>Send Mail Example</h2>';
echo '<p>This is a demo. Actual mail sending may not work on local servers.</p>';
/*
$to = 'someone@example.com';
$subject = 'Test Email';
$message = 'Hello from PHP!';
$headers = 'From: webmaster@example.com';
if (mail($to, $subject, $message, $headers)) {
    echo '<p>Email sent!</p>';
} else {
    echo '<p>Failed to send email.</p>';
}
*/
echo '<pre>
$to = "someone@example.com";
$subject = "Test Email";
$message = "Hello from PHP!";
$headers = "From: webmaster@example.com";
mail($to, $subject, $message, $headers);
</pre>';
echo '</section>';

include 'template/footer.php';