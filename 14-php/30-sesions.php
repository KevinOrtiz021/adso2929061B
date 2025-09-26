<?php
$title = '30 - Sessions';
$description = 'Manage sessions in PHP.';
include 'template/header.php';

echo '<section>';
session_start();
if (!isset($_SESSION['visits'])) {
    $_SESSION['visits'] = 1;
} else {
    $_SESSION['visits']++;
}
echo '<p>Session visits: ' . $_SESSION['visits'] . '</p>';
echo '</section>';

include 'template/footer.php';