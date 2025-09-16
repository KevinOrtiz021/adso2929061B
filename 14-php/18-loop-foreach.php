<?php
$title = '18-loop-foreach';
$description = 'Loop that repeats for a specific lenght of an array';

include 'template/header.php';

echo "<section>";

$word = 'AMERICA';
$langs = ['PHP', 'HTML', 'CSS', 'JS'];

foreach($langs as $i => $lang){
    echo "<p>$i ======> $lang</p>";
}

echo "</section>";

include 'template/footer.php';