<?php
    $title = '04- Variables';
    $description = 'How to assign values.';

    include 'template/header.php';

    echo "<section>";

    $string1 = "Lorem Ipsum dolor";
    $string2 = "sit amet consecutare...";

    echo "<p>$string1 $string2</p>";
    echo "Characters Lengt is: " . strlen($string1 . $string2);
    
    

    include 'template/footer.php';
