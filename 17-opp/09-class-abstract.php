<?php
$title = '09-class-abstract';
$description = 'A class that cannot be instantiated, only extended from.';
include 'template/header.php';
echo "<section>";

abstract class DataBase{
    protected $host = 'localhost';
    protected $user = 'root';
    protected $pass = '';
    protected $dbname = 'pokeadso';
    protected $conx;
}

include 'template/footer.php';
