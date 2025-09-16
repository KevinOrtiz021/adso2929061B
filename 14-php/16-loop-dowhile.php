<?php
$title = '16-loop-Dowhile';
$description = 'Loop that executes WHILE a condition comes true.';

include 'template/header.php';

echo "<section>";

$i = 1; 
do {
    if($i % 2 == 0){
        echo "<p>$i</p>";
    }
    $i++;
} while($i < 18);

echo "</section>";

include 'template/footer.php';