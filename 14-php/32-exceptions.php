<?php
$title = '32 - Exceptions';
$description = 'Handle exceptions in PHP.';
include 'template/header.php';

echo '<section>';
try {
    throw new Exception('This is an exception!');
} catch (Exception $e) {
    echo '<p>Caught exception: ' . $e->getMessage() . '</p>';
}
echo '</section>';

include 'template/footer.php';