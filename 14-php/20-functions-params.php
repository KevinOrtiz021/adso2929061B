<?php
$title = '20-functions-params';
$description = 'Functions that operate with values send by parammeter';

include 'template/header.php';

echo "<section>";

function sum($n1, $n2 = 5){
    echo "<p>" . ($n1 + $n2) . "</p>";
}

sum(1, 2);
sum(5);

echo "</section>";

include 'template/footer.php';