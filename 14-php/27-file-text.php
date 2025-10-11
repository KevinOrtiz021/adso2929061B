<?php
$title = '27 - File and Text Handling';
$description = 'Learn how to work with files and text in PHP.';
include_once 'template/header.php';

    echo '<section>';

    echo '<h2>File Handling</h2>';
    $filename = 'text/text.html';
    if (!file_exists('text')) {
        mkdir('text', 0777, true);
    }
    $file = fopen($filename, "a+") or die("Unable to open file!");
    fwrite($file, "Hello, World!\n");
    rewind($file);
    $content = fread($file, filesize($filename));
    fclose($file);

    echo '<p><strong>File content:</strong></p>';
    echo '<pre>' . htmlspecialchars($content) . '</pre>';

    echo '<h2>Text Handling</h2>';
    $text = "Hello, World!";
    echo '<p>' . $text . '</p>';
    echo '<p>String length: ' . strlen($text) . '</p>';
    echo '<p>Uppercase: ' . strtoupper($text) . '</p>';

    include 'template/footer.php';
?>