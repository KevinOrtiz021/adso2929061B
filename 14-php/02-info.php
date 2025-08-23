<?php
    $title = '02-PHP Info';
    $description = 'Show ';
    include 'template/header.php';

    echo "<section style='width: 100%'>";
    phpinfo();

    include 'template/footer.php';
