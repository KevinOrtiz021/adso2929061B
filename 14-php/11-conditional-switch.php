<?php
    $title = '11- Numeric Arrays';
    $description = 'Example of a numeric matrix with manual index';

    include 'template/header.php';
    echo "<section>";

    $carros_manual[0] = "Mazda 3 🚗";
    $carros_manual[1] = "Renault Duster 🚙";
    $carros_manual[2] = "Nissan GT-R 🏎️";
    $carros_manual[3] = "Audi Q7 🚘";

    $indice_manual = 0; 
    $carro_manual = $carros_manual[$indice_manual];
?>

<h2>Método 2: Índice Manual</h2>
<p><strong>Índice seleccionado:</strong> <?php echo $indice_manual; ?></p>
<p><strong>Carro:</strong> <?php echo $carro_manual; ?></p>

<?php switch($carro_manual): ?>
<?php case 'Mazda 3 🚗': ?>
    <h4>El carro seleccionado es un Mazda 3 🚗</h4>
    <?php break; ?>
<?php case 'Renault Duster 🚙': ?>
    <h4>El carro seleccionado es un Renault Duster 🚙</h4>
    <?php break; ?>
<?php case 'Nissan GT-R 🏎️': ?>
    <h4>El carro seleccionado es un Nissan GT-R 🏎️</h4>
    <?php break; ?>
<?php case 'Audi Q7 🚘': ?>
    <h4>El carro seleccionado es un Audi Q7 🚘</h4>
    <?php break; ?>
<?php default: ?>
    <h4>No se encontró el carro seleccionado</h4>
<?php endswitch; ?>

<?php include 'template/footer.php';
