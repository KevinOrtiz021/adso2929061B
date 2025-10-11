<?php
$title = '32 - Exceptions';
$description = 'Handle exceptions in PHP.';
include_once 'template/header.php';

echo '<section>';
echo '<h2>Verificar edad para votar </h2>';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $edad = (int)$_POST['edad'];

    try {
        if ($edad < 18) {
            throw new Exception(' No puedes votar. Debes tener al menos 18 años.');
        } else {
            
            echo '<p style="color:green;"> Puedes votar. Tienes ' . $edad . ' años.</p>';
        }
    } catch (Exception $e) {
        echo '<p style="color:red;">' . $e->getMessage() . '</p>';
    }
}

echo '<form method="post" style="margin-top:20px; max-width:300px; display:flex; flex-direction:column; gap:10px;">
    <label for="edad">Ingresa tu edad:</label>
    <input type="number" name="edad" id="edad" required min="0" style="padding:8px; border-radius:6px; border:1px solid #ccc;">
    <input type="submit" value="Verificar" style="background:#007BFF; color:white; border:none; padding:10px; border-radius:6px; cursor:pointer;">
</form>';

echo '</section>';

include_once 'template/footer.php';
?>
