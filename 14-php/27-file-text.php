<?php
$title = '27 - File text';
$description = 'Read and write text files with PHP.';
include 'template/header.php';

echo '<section>';
$file = 'sample.txt';
$text = 'Hello, this is a text file!';
file_put_contents($file, $text);
$read = file_get_contents($file);
echo '<h2>File Write & Read</h2>';
echo '<p>Written: ' . $text . '</p>';
echo '<p>Read: ' . $read . '</p>';
echo '</section>';

include 'template/footer.php';