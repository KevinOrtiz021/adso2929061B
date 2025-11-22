<?php
$title = '04-collaboration';
$description = "Objects working together by calling each other's methods.";
include 'template/header.php';
echo "<section>";

class Evolve{
    public function evolvePokemon($origin, $evolution){
        echo "<ul>
                <li style='display: flex; justify-content: space-between; aling-items: center;'>
                    <span>{$origin}</span> <span>↔➡️</span> <span>{$evolution}</span>
                </li>
            </ul>";
    }
}

class Pokemon{
    private $origin;
    private $evolution;
    private $collaboration;

    public function __construct($origin, $evolution){
        $this->origin = $origin;
        $this->evolution = $evolution;
        //Collaboration
        $this->collaboration = new Evolve();
    }
    public function nextLevel(){
        $this->collaboration->evolvePokemon($this->origin, $this->evolution);
    }
}

$ev1 = new Pokemon('Pichu', 'Pikachu');
$ev1->nextLevel();
$ev1 = new Pokemon('Pikachu', 'Raichu');
$ev1->nextLevel();
$ev1 = new Pokemon('Bulbasaur', 'Inysaur');
$ev1->nextLevel();
$ev1 = new Pokemon('Inysaur', 'Venusaur');
$ev1->nextLevel();
$ev1 = new Pokemon('Squirtle', 'Wartortle');
$ev1->nextLevel();
$ev1 = new Pokemon('Wartortle', 'Blastoise');
$ev1->nextLevel();
$ev1 = new Pokemon('Charmander', 'Charmilion');
$ev1->nextLevel();
$ev1 = new Pokemon('Charmilion', 'Charizard');
$ev1->nextLevel();


include 'template/footer.php';
