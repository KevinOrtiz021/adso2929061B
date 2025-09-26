<?php
$title = '24-Date & Time';
$description = 'Learn how to work with dates and times in PHP.';
include 'template/header.php';
echo '<section>';

date_default_timezone_set('America/Bogota');
echo '<h2>Current Date and Time</h2>';
echo '<p>' . date('d-m-Y H:i:s') . '</p>';

echo '</section>';
include 'template/footer.php';