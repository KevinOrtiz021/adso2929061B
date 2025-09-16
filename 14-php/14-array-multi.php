<?php
$title = '14-Arrays-Multidimensional';
$description = 'Array that contains other nested arrays.';

include 'template/header.php';

echo "<section>";

$bicycles = array(
    'Specialized' => ['Monster', 'Pro', 'Good'],
    'Santa Cruz' => ['High', 'Nomad', 'Tower']
);

foreach($bicycles as $key => $value){
    echo "<h3>$key</h3>";
    echo "<ul>";
    foreach($value as $ref){
        echo "<li>$ref</li>";
    }
    echo "</ul>";
}

echo "</section>";

?>

<?php include 'template/footer.php'; ?>