<?php
session_start();
if(!isset($_SESSION["level"]))
{
	header("Location: /login");
}
setcookie("sub", $_SESSION['sub'], time() + (86400 * 30), "/");
?>
<html>
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, user-scalable=yes, initial-scale=1, maximum-scale=1"
    />
    <meta
      name="description"
      content=""
    />
    <meta name="keywords" content="HTML,CSS,JavaScript, WebRTC, Camera" />
    <meta name="author" content="Kasper Kamperman" />
    <title></title>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>
  <body>
    <div id="container">
      <div id="vid_container">
        <video id="video" autoplay playsinline></video>
        <div id="video_overlay"></div>
      </div>
      <div id="gui_controls">
      <input type="hidden" name="image" id="image" value="blob">

        <button
          id="switchCameraButton"
          name="switch Camera"
          type="button"
          aria-pressed="false"
        ></button>
        <button id="takePhotoButton" name="take Photo" type="button"></button>
        <button
          id="toggleFullScreenButton"
          name="toggle FullScreen"
          type="button"
          aria-pressed="false"
        ></button>

        <!-- <form id="imageForm" enctype="multipart/form-data" action="dense.php" method="post">
  <input type="hidden" id="imageData" name="imageData">
  <button type="button" onclick="submitForm()"></button>
</form> -->




      </div>
    </div>
    <script src="js/adapter.min.js"></script>
    <script src="js/screenfull.min.js"></script>
    <script src="js/howler.core.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
