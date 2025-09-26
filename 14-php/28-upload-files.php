<?php
$title = '28 - Upload Files';
$description = 'Handle file uploads in PHP.';
include 'template/header.php';

echo '<section>';
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    $upload = $uploadDir . basename($_FILES['file']['name']);
    if (move_uploaded_file($_FILES['file']['tmp_name'], $upload)) {
        echo '<p>File uploaded: ' . htmlspecialchars($upload) . '</p>';
    } else {
        echo '<p>Upload failed.</p>';
    }
}
?>
<form method="post" enctype="multipart/form-data">
    <label for="file">Choose file:</label>
    <input type="file" name="file" id="file">
    <input type="submit" value="Upload">
</form>
<?php
echo '</section>';

include 'template/footer.php';