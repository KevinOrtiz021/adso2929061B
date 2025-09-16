<?php
$title = '21-functions-returns';
$description = 'Functions that return a response / result';

include 'template/header.php';

echo "<section>";

function div($n1, $n2 = 5){
    return "<p>$n1 / $n2 = " . ($n1 / $n2) . "</p>";
}

echo div(25);
echo div(25, 6);

echo "</section>";

include 'template/footer.php';