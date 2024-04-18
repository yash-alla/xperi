<?php
session_start();
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');

setcookie("subx", $_SESSION['sub'], time() + (86400 * 30), "/");
?>
<!DOCTYPE html>
<html>
 
<head>
     <link rel="stylesheet" href="stylex.css">

  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js"></script>
  
  <script src="https://unpkg.com/ml5@0.5.0/dist/ml5.min.js"></script>
  <link href="https://fonts.googleapis.com/css?family=Titillium+Web&display=swap" rel="stylesheet">
    
  <link rel="stylesheet" type="text/css" href="style.css">
  <meta charset="utf-8" />

</head>

<body>
    <div class="loading">
            <p>Classifying!</p>
            <span><i></i><i></i></span>
        </div>
  <script src="sketch.js"></script>
</body>

</html>