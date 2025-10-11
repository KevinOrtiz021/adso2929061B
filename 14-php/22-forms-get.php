<?php
$title = "22 - Form Post";
$description = "A simple form that uses the POST method to submit data";

include 'template/header.php';

echo '<section>';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = trim($_POST['fullname'] ?? '');
    $email = trim($_POST['email'] ?? '');

    if (!empty($fullname) && !empty($email)) {
        echo "<p>Hello, $fullname!</p>";
        echo "<p>Your email is: $email</p>";
    } else {
        echo '<p style="color:red;">Error: Please enter your full name and email.</p>';
    }
}
?>

<form method="post" action="">
    <label for="fullname">Full Name:</label>
    <input type="text" id="fullname" name="fullname">
    <br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    <br>
    <input type="submit" value="Submit">
</form>

<?php
echo '</section>';

include 'template/footer.php';
?>