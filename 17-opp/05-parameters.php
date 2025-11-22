<?php
$title = '05-parameters';
$description = 'Values passed into a function to customize its operation.';

include 'template/header.php';

echo "<section>";

class Country
{
    public $name;
    public function __construct($name)
    {
        $this->name = $name;
    }
}
class FifaWorldCup
{
    private $country;
    private $year;
    private $winner;

    public function __construct($country, $year, $winner = 'Brazil') {
        $this->country = $country;
        $this->year    = $year;
        $this->winner  = $winner;
    }
    public function showEvent() {
        echo "<ul>
                <li style='display: flex;flex-direction: column;border: 2px solid #0009;padding: 0.5rem;margin-bottom: 0.5rem;justify-content: center;align-items: center;'>
                    <span><b>Country:</b> {$this->country->name}</span>
                    <span><b>Year:</b> {$this->year}</span>
                    <span><b>Winner:</b> {$this->winner}</span>
                </li>            
            </ul>";
    }
}

$country = new Country("Italy");
$worldCup = new FifaWorldCup($country, 1990, "Germany");
$worldCup->showEvent();

$country = new Country("USA");
$worldCup = new FifaWorldCup($country, 1994, );
$worldCup->showEvent();

$country = new Country("France");
$worldCup = new FifaWorldCup($country, 1998, "France");
$worldCup->showEvent();

$country = new Country("Korea & Japon");
$worldCup = new FifaWorldCup($country, 2002, );
$worldCup->showEvent();

$country = new Country("Germany");
$worldCup = new FifaWorldCup($country, 2006, "Italy");
$worldCup->showEvent();

include 'template/footer.php';
