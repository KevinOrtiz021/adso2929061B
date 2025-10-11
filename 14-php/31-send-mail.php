<?php
$title = '31 - Send Mail';
$description = 'Send emails using PHP.';
include_once 'template/header.php';

echo '<section><h2>Formulario de Envío de Mensaje</h2><p>Ejemplo de contacto (en local no enviará el correo).</p>';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = nl2br(htmlspecialchars($_POST['message']));
    echo "<p style='color:green;'>Mensaje enviado con éxito.</p>
        <p><strong>De:</strong> $email</p>
        <p><strong>Asunto:</strong> $subject</p>
        <p><strong>Mensaje:</strong><br>$message</p>";
}

echo '<form method="post" style="margin-top:20px;max-width:400px;display:flex;flex-direction:column;gap:10px;">
<label>Correo:</label><input type="email" name="email" required style="padding:8px;border-radius:6px;border:1px solid #ccc;">
<label>Asunto:</label><input type="text" name="subject" required style="padding:8px;border-radius:6px;border:1px solid #ccc;">
<label>Mensaje:</label><textarea name="message" rows="5" required style="padding:8px;border-radius:6px;border:1px solid #ccc;"></textarea>
<input type="submit" value="Enviar" style="background:#007BFF;color:white;border:none;padding:10px;border-radius:6px;cursor:pointer;">
</form></section>';

include_once 'template/footer.php';
?>
