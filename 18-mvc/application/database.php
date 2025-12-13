<?php
abstract class DataBase
{
    protected static $conn = null;

    public static function connect()
    {
        if (self::$conn === null) {
            try {
                $host = 'localhost';
                $dbname = 'pokeadso';
                $user = 'root';
                $pass = '';

                self::$conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
                self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                die("Error de conexión: " . $e->getMessage());
            }
        }
        return self::$conn;
    }
}
?>