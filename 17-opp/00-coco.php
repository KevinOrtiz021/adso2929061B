<?php
$title = 'Pokémon OOP';
$description = 'Alta cohesión y bajo acoplamiento';
include 'template/header.php';
echo '<section>';



/* ===========================================================
   1️⃣ Interface Tipo → Bajo acoplamiento
   =========================================================== */
interface Tipo {
    public function obtenerNombreTipo(): string;
}



/* ===========================================================
   2️⃣ Tipos concretos → Alta cohesión
   =========================================================== */
class TipoElectrico implements Tipo {
    public function obtenerNombreTipo(): string {
        return "Eléctrico";
    }
}

class TipoAgua implements Tipo {
    public function obtenerNombreTipo(): string {
        return "Agua";
    }
}



/* ===========================================================
   3️⃣ Clase Pokémon → Alta cohesión
      Solo representa un Pokémon y su estado de captura
   =========================================================== */
class Pokemon {
    public string $nombre;
    public Tipo $tipo;
    public bool $capturado = false;

    public function __construct(string $nombre, Tipo $tipo) {
        $this->nombre = $nombre;
        $this->tipo = $tipo;
    }

    public function capturar() {
        $this->capturado = true;
    }
}



/* ===========================================================
   4️⃣ Entrenador → Alta cohesión + Bajo acoplamiento
      No depende de tipos específicos de Pokémon
   =========================================================== */
class Entrenador {
    public string $nombre;
    private array $equipo = [];

    public function __construct(string $nombre) {
        $this->nombre = $nombre;
    }

    // El entrenador captura un Pokémon
    public function capturarPokemon(Pokemon $pokemon) {
        $pokemon->capturar();       // Cambia estado del pokémon
        $this->equipo[] = $pokemon; // Lo agrega a su equipo
    }

    public function obtenerEquipo(): array {
        return $this->equipo;
    }
}



/* ===========================================================
   5️⃣ Ejemplo en acción
   =========================================================== */

// Creamos pokémon
$pikachu = new Pokemon("Pikachu", new TipoElectrico());
$squirtle = new Pokemon("Squirtle", new TipoAgua());

// Creamos entrenador
$ash = new Entrenador("Ash Ketchum");

// El entrenador captura pokémones
$ash->capturarPokemon($pikachu);
$ash->capturarPokemon($squirtle);

// Mostrar equipo usando foreach
echo "<h2>Pokémon capturados por {$ash->nombre}</h2>";
echo "<ul>";

foreach ($ash->obtenerEquipo() as $pokemon) {
    echo "<li>
        <strong>{$pokemon->nombre}</strong>  
        (Tipo: {$pokemon->tipo->obtenerNombreTipo()}) — 
        Estado: " . ($pokemon->capturado ? "Capturado ✔" : "Libre ✖") . "
    </li>";
}

echo "</ul>";

echo '</section>';
include 'template/footer.php';
?>
