<?php
    $title = '12- Arrays Index Numeric';
    $description = 'Example of a numeric array with automatic index';

    include 'template/header.php';

    echo "<section>";

    $carros = array("Mazda 3 ", "Renault Duster ", "Nissan GT-R ", "Audi Q7 ");

    foreach($carros as $indice => $carro) {
        echo "<p><strong>Índice:</strong> $indice | <strong>Carro:</strong> $carro</p>";
    }

    echo "</section>";

?>


<?php include 'template/footer.php';

