<?php
    $title = '11- Numeric Arrays';
    $description = 'Example of a numeric matrix with manual index';

    include 'template/header.php';
    echo "<section>";

    $carros_manual[0] = "Mazda 3";
    $carros_manual[1] = "Renault Duster";
    $carros_manual[2] = "Nissan GT-R";
    $carros_manual[3] = "Audi Q7";

    $indice_manual = 0; 
    $carro_manual = $carros_manual[$indice_manual];

    echo "<h2>Método 2: Índice Manual</h2>";
    echo "<p><strong>Índice seleccionado:</strong> $indice_manual</p>";
    echo "<p><strong>Carro:</strong> $carro_manual</p>";

    switch($carro_manual) {
        case 'Mazda 3':
            echo '<h4>El carro seleccionado es un Mazda 3 🚗</h4>';
            break;
        case 'Renault Duster':
            echo '<h4>El carro seleccionado es un Renault Duster 🚙</h4>';
            break;
        case 'Nissan GT-R':
            echo '<h4>El carro seleccionado es un Nissan GT-R 🏎️</h4>';
            break;
        case 'Audi Q7':
            echo '<h4>El carro seleccionado es un Audi Q7 🚘</h4>';
            break;
        default:
            echo '<h4>No se encontró el carro seleccionado</h4>';
    }

    include 'template/footer.php';
?>