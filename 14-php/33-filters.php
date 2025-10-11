<?php
$title = '33 - Filters';
$description = 'Sanitize and validate data with PHP filters.';
include_once 'template/header.php';

echo '<section><h2> Filtro de Ciudad o Edad</h2>';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $v = $_POST['valor'];
    $t = $_POST['tipo'];
    $s = $v; $ok = false;

    if ($t == 'edad') {
        $s = filter_var($v, FILTER_SANITIZE_NUMBER_INT);
        $ok = ($s >= 0 && $s <= 120);
    } elseif ($t == 'ciudad') {
        $s = filter_var($v, FILTER_SANITIZE_SPECIAL_CHARS);
        $ok = !empty($s);
    }

    echo "<p><b>Original:</b> $v<br><b>Filtrado:</b> $s<br><b>Válido:</b> " . ($ok ? '<span style=color:green>✅ Sí</span>' : '<span style=color:red>❌ No</span>') . "</p>";
}

echo '<form method="post" style="display:flex;flex-direction:column;gap:8px;max-width:300px;">
<input name="valor" placeholder="Ingresa una ciudad o edad" required>
<select name="tipo">
<option value="ciudad">Ciudad</option>
<option value="edad">Edad</option>
</select>
<button type="submit">Filtrar</button>
</form></section>';

include_once 'template/footer.php';
?>
