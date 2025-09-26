<?php
$title = '29 - Cookies';
$description = 'Set and read cookies in PHP.';
include 'template/header.php';

echo '<section>';
if (!isset($_COOKIE['mycookie'])) {
    setcookie('mycookie', 'Hello Cookie!', time() + 3600);
    echo '<p>Cookie set! Reload the page.</p>';
} else {
    echo '<p>Cookie value: ' . htmlspecialchars($_COOKIE['mycookie']) . '</p>';
}
echo '</section>';

include 'template/footer.php';