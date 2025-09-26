<?php
$title = '26 - Server Side Inclide (SSI)';
$description = 'Learn about server side includes in PHP.';
include 'template/header.php';

echo '<section>';
echo '<h2>Server Side Include Example</h2>';
echo '<p>This page uses PHP <code>include</code> to insert header and footer files.</p>';
echo '<p>Try editing <code>template/header.php</code> or <code>template/footer.php</code> to see changes here.</p>';
echo '</section>';

include 'template/footer.php';