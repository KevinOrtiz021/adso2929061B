<?php
$title = '02-construct';
$description = 'Lorem input dolor sit amet';

include 'template/header.php';

echo '<section>';

class PlayList {
    # Attrs
    public $artist;
    public $album;
    public $year;
    public $song;

    # Construct Method
    public function __construct($artist, $album, $year, $song = 'Happy birthay') {
        $this->artist = $artist;
        $this->album  = $album;
        $this->year   = $year;
        $this->song   = $song;
    }

}

$pl = new PlayList('Juanes', 'La camisa negra', 1998, 'La tierra');
echo $pl->song;
include 'template/footer.php';
