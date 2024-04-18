<?php
session_start();
if(!isset($_SESSION['level'])){
    header("location: ../../login");
}else{
    $level = $_SESSION['level'];
}
if(!isset($_COOKIE["info"]) || !isset($_COOKIE["nme"])) {
  header("location: ../../login");
} else {
  $co = $_COOKIE["info"];
  $nme= $_COOKIE["nme"];
}
$im = "../AR/img/".$nme;
$pth = "src: ".$im."; minCutOffValue: 1; betaValue:0.1;";
$d = 'raccoon.glb';
?>
<!DOCTYPE html>
<html>
  <head>
    <title></title>
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
    <script type="text/JavaScript">
   function ttsxc(txt){
   
      var msg = new SpeechSynthesisUtterance();
msg.text = txt;
console.log(txt);
window.speechSynthesis.speak(msg);

    }
    
  </script>
  <script type="text/JavaScript">
      let d = "<?php 
      $m = str_replace("<br>", "", $co);
      $m = str_replace(['"', "'",','], '', $m);
      $m = preg_replace('/\s+/', ' ', $m);
      $m = trim($m);
      echo $m ;?>"
  </script>
</head>
<body onload="ttsxc(d)">  
    <script src="https://cdn.jsdelivr.net/npm/aframe-textwrap-component@0.3.1/dist/aframe-textwrap-component.min.js"></script>
   <script> let spge = '<?php echo $co ;?>'; </script>
    <script
    
      src="https://cdn.jsdelivr.net/gh/akbartus/Simple-AR/dist/0.1.2/simple-ar.min.js"
      onload="onWasmLoaded();"
    ></script>
    <a-scene 
       onclick="ASTT()">
      <a-entity id="myPlan" simple-ar= "<?php echo $pth ;?>" >
       <a-text 
        id="text"
        wrap-count="55"
        width="1.5" 
        opacity="1"
        color="#FFC"
        position="0.3 0 -1"
        rotation="0 -30 0"
        height="0.3" 
        letterSpacing ="-0.3"
        lineHeight="-0.3"
        value= '<?php echo $co ;?>'
        >
      </a-text>
          <a-camera id="camera"></a-camera>
  <a-entity 
  coloring position="0 0.4 -3.5" 
  gltf-model='<?php echo $d ;?>' 
  class="clickable" 
  scale="0.1 0.1 0.1"></a-entity>
  
      <a-plane 
       position="-1.2 0.0 -0.3" 
       opacity = "1" 
       rotation="0 60 0" width="1" height="1" 
       material="src: <?php echo $im ;?>"
       ></a-plane>
      </a-entity>
      <a-camera position="0 0 0"></a-camera>
    </a-scene>
    <script>
function ASTT() {
   // alert('l');
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (typeof SpeechRecognition === 'undefined') {
    transcriptElement.textContent = 'Speech Recognition is not supported by your browser.';
    alert('Speech Recognition is not supported by your browser.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US'; 
  recognition.interimResults = false; 
  recognition.continuous = true;  

  recognition.start();

  recognition.onresult = function(event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    if(transcript.length > 0){
        if(transcript.toLowerCase() == "log out"){
            window.location.href = "https://nextio.in/login";
        }
    Ajax(transcript);
    }
  };

  recognition.onerror = function(event) {
    transcriptElement.textContent = 'Speech Recognition Error: ' + event.error;
    alert(event.error);
  };
}

function Ajax(data) {
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "back.php", true); 
  xhr.setRequestHeader("Content-Type", "application/json"); 

  xhr.onload = function() {
    if (xhr.status === 200) {
      console.log("Success! Response:", xhr.responseText);
      ttsxc(xhr.responseText)
      document.getElementById('text').setAttribute('value', xhr.responseText);
    } else {
      alert("Error:"+ xhr.statusText);
    }
  };

  xhr.onerror = function(error) {
    alert("Network Error:", error);
  };

  if (data) {
    const jsonData = JSON.stringify({ message: data });
    xhr.send(jsonData);
  } else {
    
  }
}

</script>

  </body>
</html>
