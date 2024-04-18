<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
  $file = $_FILES['image'];

  if ($file['error'] === UPLOAD_ERR_OK) {
    move_uploaded_file($file['tmp_name'], 'AR/img/' . $file['name']);
    $messageContent = $firstChoice['message']['content'];
                $cookie_name = "nme";
                $cookie_value = $file['name'];
                setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
                echo 'Image uploaded successfully';
  } else {
    echo 'Error uploading image';
  }
} else {
  echo 'Invalid request';
}
?>
