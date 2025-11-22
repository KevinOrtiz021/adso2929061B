<?php
$title = '02-construct';
$description = 'Special method that initializes a new object upon creation.';

include 'template/header.php';

echo '<section>';

class PlayList{
    # Attrs
    public $name;
    public $artist = array();
    public $genre = array();
    public $image = array();
    public $year = array();

    # Construct Method
    public function __construct($name){
        $this->name = $name;
    }
    public function setPlayList($artist, $genre, $image, $year){
        $this->artist[] = $artist;
        $this->genre[] = $genre;
        $this->image[] = $image;
        $this->year[] = $year;
    }
    public function getPlayList(){
        echo "<h3>PlayList: $this->name</h3>
            <div style='display:flex; gap: 0.4rem; flex-direction: column'>";
        foreach ($this->artist as $i => $artist) {
            echo "<div style='display: flex; gap: 0.4rem; border: 2px solid #0009; background:#0003'>
                    <img src='{$this->image[$i]}' width='160px'>
                    <div>
                        <h4>Artist: $artist</h4>
                        <h5>Genre: {$this->genre[$i]}</h5>
                        <h5>Year: {$this->year[$i]}</h5>
                    </div>
                    </div>";
        }
        echo "</div>";
    }
}
$pl = new PlayList('Julio Jaramillo');
$pl->setPlayList('Fatalidad', 'Bolero', 'https://acortar.link/jk1qao', 1956);
$pl->setPlayList('Nuestro Juramento', 'Bolero', 'https://acortar.link/RUvknH', 1957);
$pl->setPlayList('Te Esperaré', 'Bolero', 'https://acortar.link/bSWgNq', 1948);
$pl->getPlayList();

include 'template/footer.php';
