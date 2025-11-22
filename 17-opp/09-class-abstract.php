<?php
$title = '09-class-abstract';
$description = 'A class that cannot be instantiated, only extended from.';
include 'template/header.php';
echo "<section>";

abstract class DataBase{
protected $host = 'localhost';
protected $user = 'root';
protected $password = '';
protected $dbname = 'pokeadso';
protected $conx;

protected function connect() {
try {
    $this->conx = new PDO(
        "mysql:host={$this->host};dbname={$this->dbname}",
        $this->user,
        $this->password
    );
    $this->conx->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $this->conx->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $this->conx;
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
}
}
class PokemonList extends DataBase {
public function getPokemons() {
    $con = $this->connect();
    $sql = "SELECT id, name, type FROM pokemons";
    $result = $con->query($sql);
    $pokemons = $result->fetchAll(PDO::FETCH_ASSOC);
    return $pokemons;
}
}
$poke = new PokemonList();
$listado = $poke->getPokemons();
echo "
<h2>Lista de Pokemones</h2>
<table border='1' cellpadding='10' style='border-collapse: collapse'>
    <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Tipo</th>
    </tr>";

foreach ($listado as $p) {
echo "
    <tr>
        <td>{$p['id']}</td>
        <td>{$p['name']}</td>
        <td>{$p['type']}</td>
    </tr>";
}

echo "</table>";

include 'template/footer.php';