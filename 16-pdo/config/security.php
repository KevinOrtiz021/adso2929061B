<?php
if(isset($_SESSION['uid'])){
    $_SESSION['error'] = "Por favor, Inicia sesión primero.";
    echo "<script
            >window.location.replace('../index.php');
          </script>";
}