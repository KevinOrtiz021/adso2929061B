<?php
    $title = '05- Strings';
    $description = 'Characters values';

    include 'template/header.php';

    echo "<section>";

    $string1 = "Lorem Ipsum dolor";
    $string2 = "sit amet consecutare...";

    
    echo "<p>$string1 $string2</p>";
    echo "Characters Length is: " . strlen($string1 . $string2);
    echo "<br>";
    echo "Position of ADSO into Hello Adso: " . strpos('Hello ADSO', 'ADSO');
    echo "<br>";
    echo "Substraction last 5 words of Visualization: " . substr('Visualization', -5);

    include 'template/footer.php';
