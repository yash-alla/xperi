const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const button = document.getElementById('submit_button');
const captureButton = document.getElementById('capture_button');
const input = document.getElementById('image_url');
const result = document.getElementById('prediction');

let model;
let isModelLoaded = false;

// Load COCO-SSD model
cocoSsd.load().then(_model => {
    model = _model;
    isModelLoaded = true;
});

button.onclick = () => {
    const url = input.value;
    loadImage(url);
};

function loadImage(url) {
    result.innerText = "Loading...";
    img.src = url;
}

captureButton.onclick = () => {
    captureImage();
};

function captureImage() {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL();
    loadImage(dataURL);
}

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play(); // Start playing the video immediately
    })
    .catch(error => {
        console.error('Error accessing the camera.', error);
    });

video.addEventListener('play', () => {
    const canvasContext = canvas.getContext('2d');
    setInterval(() => {
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
        if (isModelLoaded) {
            model.detect(video).then(predictions => {
                showPrediction(predictions);
            });
        }
    }, 1000 / 30); // 30 fps
});

function showPrediction(predictions) {
    console.log(predictions);
    if (predictions.length > 0) {
        result.innerText = "This might be a " + predictions[0].class;
    } else {
        result.innerText = "No objects detected.";
    }
}
