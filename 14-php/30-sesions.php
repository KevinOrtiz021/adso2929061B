<?php
$title = '30 - Sessions';
$description = 'Manage sessions in PHP.';
include 'template/header.php';

echo '<section>';
echo '<h2>Cookie Visit Counter </h2>';

$visitCountName = 'visit_count';
$lastVisitName = 'last_visit';

if (!isset($_COOKIE[$visitCountName])) {
    $visitCount = 1;
    $lastVisit = date('d-m-Y H:i:s');
    setcookie($visitCountName, $visitCount, time() + (86400 * 30)); 
    setcookie($lastVisitName, $lastVisit, time() + (86400 * 30));
    echo '<p> Bienvenido por primera vez a esta página.</p>';
} else {
    $visitCount = (int)$_COOKIE[$visitCountName] + 1;
    $lastVisit = $_COOKIE[$lastVisitName];
    $newVisitTime = date('d-m-Y H:i:s');

    setcookie($visitCountName, $visitCount, time() + (86400 * 30));
    setcookie($lastVisitName, $newVisitTime, time() + (86400 * 30));

    echo '<p> Hola de nuevo.</p>';
    echo '<p>Has visitado esta página <strong>' . $visitCount . '</strong> veces.</p>';
    echo '<p>Tu última visita fue el: <strong>' . htmlspecialchars($lastVisit) . '</strong></p>';
}

echo '<p style="margin-top:20px; font-size:14px; color:gray;">(Las cookies se guardan por 30 días.)</p>';
echo '</section>';

include 'template/footer.php';
?>
