var takeSnapshotUI = createClickFeedbackUI();

var video;
var takePhotoButton;
var toggleFullScreenButton;
var switchCameraButton;
var amountOfCameras = 0;
var currentFacingMode = 'environment';

function deviceCount() {
  return new Promise(function(resolve) {
    var videoInCount = 0;

    navigator.mediaDevices
      .enumerateDevices()
      .then(function(devices) {
        devices.forEach(function(device) {
          if (device.kind === 'video') {
            device.kind = 'videoinput';
          }

          if (device.kind === 'videoinput') {
            videoInCount++;
            console.log('videocam: ' + device.label);
          }
        });

        resolve(videoInCount);
      })
      .catch(function(err) {
        console.log(err.name + ': ' + err.message);
        resolve(0);
      });
  });
}

document.addEventListener('DOMContentLoaded', function(event) {
  if (
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia &&
    navigator.mediaDevices.enumerateDevices
  ) {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then(function(stream) {
        stream.getTracks().forEach(function(track) {
          track.stop();
        });

        deviceCount().then(function(deviceCount) {
          amountOfCameras = deviceCount;
          initCameraUI();
          initCameraStream();
        });
      })
      .catch(function(error) {
        if (error === 'PermissionDeniedError') {
          alert('Permission denied. Please refresh and give permission.');
        }

        console.error('getUserMedia() error: ', error);
      });
  } else {
    alert(
      'Mobile camera is not supported by browser, or there is no camera detected/connected',
    );
  }
});

function initCameraUI() {
  video = document.getElementById('video');
  takePhotoButton = document.getElementById('takePhotoButton');
  toggleFullScreenButton = document.getElementById('toggleFullScreenButton');
  switchCameraButton = document.getElementById('switchCameraButton');

  takePhotoButton.addEventListener('click', function() {
    takeSnapshotUI();
    takeSnapshot();
  });

  function fullScreenChange() {
    if (screenfull.isFullscreen) {
      toggleFullScreenButton.setAttribute('aria-pressed', true);
    } else {
      toggleFullScreenButton.setAttribute('aria-pressed', false);
    }
  }

  if (screenfull.isEnabled) {
    screenfull.on('change', fullScreenChange);

    toggleFullScreenButton.style.display = 'block';

    fullScreenChange();

    toggleFullScreenButton.addEventListener('click', function() {
      screenfull.toggle(document.getElementById('container')).then(function() {
        console.log(
          'Fullscreen mode: ' +
            (screenfull.isFullscreen ? 'enabled' : 'disabled'),
        );
      });
    });
  } else {
    console.log("iOS doesn't support fullscreen (yet)");
  }

  if (amountOfCameras > 1) {
    switchCameraButton.style.display = 'block';

    switchCameraButton.addEventListener('click', function() {
      if (currentFacingMode === 'environment') currentFacingMode = 'user';
      else currentFacingMode = 'environment';

      initCameraStream();
    });
  }

  window.addEventListener(
    'orientationchange',
    function() {
      var angle = screen.orientation ? screen.orientation.angle : window.orientation;
      var guiControls = document.getElementById('gui_controls').classList;
      var vidContainer = document.getElementById('vid_container').classList;

      if (angle == 270 || angle == -90) {
        guiControls.add('left');
        vidContainer.add('left');
      } else {
        if (guiControls.contains('left')) guiControls.remove('left');
        if (vidContainer.contains('left')) vidContainer.remove('left');
      }
    },
    false,
  );
}

function initCameraStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(function(track) {
      track.stop();
    });
  }

  var size = 1280;

  var constraints = {
    audio: false,
    video: {
      width: { ideal: size },
      height: { ideal: size },
      facingMode: currentFacingMode,
    },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess)
    .catch(handleError);

  function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;

    if (constraints.video.facingMode) {
      if (constraints.video.facingMode === 'environment') {
        switchCameraButton.setAttribute('aria-pressed', true);
      } else {
        switchCameraButton.setAttribute('aria-pressed', false);
      }
    }

    const track = window.stream.getVideoTracks()[0];
    const settings = track.getSettings();
    console.log('settings ' + JSON.stringify(settings, null, 4));
  }

  function handleError(error) {
    console.error('getUserMedia() error: ', error);
  }
}

function getCookie(name) {
  // Split all cookies into an array
  const cookies = document.cookie.split(';');

  // Loop through the cookies array
  for (let cookie of cookies) {
      // Trim any leading whitespace
      cookie = cookie.trim();

      // Check if this cookie has the name we're looking for
      if (cookie.startsWith(name + '=')) {
          // If it does, return the value of the cookie
          //alert(cookie.substring(name.length + 1));
          return cookie.substring(name.length + 1);
      }
  }

  // If the cookie isn't found, return null
  return null;
}

function takeSnapshot() {
  var canvas = document.createElement('canvas');

  var width = video.videoWidth;
  var height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  context = canvas.getContext('2d');
  context.drawImage(video, 0, 0, width, height);

  function getCanvasBlob(canvas) {
    return new Promise(function(resolve, reject) {
      canvas.toBlob(function(blob) {
        resolve(blob);
      }, 'image/jpeg');
    });
  }
 
  getCanvasBlob(canvas).then(function(blob) {
    var formData = new FormData();
    var unixTimestamp = Date.now();
    var name = unixTimestamp + '.png';
    formData.append('image', blob, name);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('Image uploaded successfully');
        if(getCookie('sub') == "Common"){
        window.location.href = 'dense.php?i=' + name;
        }else{
          window.location.href = 'ml';
        }
      } else {
        console.error('Error uploading image:', xhr.statusText);
      }
    };
    xhr.onerror = function() {
      console.error('Network error while uploading image');
    };
    xhr.send(formData);
  });
}

function createClickFeedbackUI() {
  var overlay = document.getElementById('video_overlay');

  var sndClick = new Howl({ src: ['snd/click.mp3'] });

  var overlayVisibility = false;
  var timeOut = 80;

  function setFalseAgain() {
    overlayVisibility = false;
    overlay.style.display = 'none';
  }

  return function() {
    if (overlayVisibility == false) {
      sndClick.play();
      overlayVisibility = true;
      overlay.style.display = 'block';
      setTimeout(setFalseAgain, timeOut);
    }
  };
}
