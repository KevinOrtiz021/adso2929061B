<?php
$title = '28 - Upload Files';
$description = 'Handle file uploads in PHP.';
include_once 'template/header.php';

echo '<section>';
echo '<h2>Upload an Image</h2>';

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['file'])) {
    $uploadDir = 'uploads/';

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $fileName = basename($_FILES['file']['name']);
    $uploadPath = $uploadDir . $fileName;

    $fileType = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    if (in_array($fileType, $allowedTypes)) {
        if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadPath)) {
            echo '<p> File uploaded successfully: ' . htmlspecialchars($fileName) . '</p>';
            echo '<img src="' . htmlspecialchars($uploadPath) . '" alt="Uploaded Image" style="max-width: 300px; margin-top: 10px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.2);">';
        } else {
            echo '<p style="color:red;"> Upload failed. Please try again.</p>';
        }
    } else {
        echo '<p style="color:red;"> Only image files (JPG, PNG, GIF, WEBP) are allowed.</p>';
    }
}

echo '<form method="post" enctype="multipart/form-data" style="margin-top:20px;">
    <label for="file">Choose image:</label>
    <input type="file" name="file" id="file" required>
    <input type="submit" value="Upload">
</form>';

echo '</section>';

include_once 'template/footer.php';
?>
