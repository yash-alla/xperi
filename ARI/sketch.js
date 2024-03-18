let mobilenet;
let video;

function setup() {
  // Retrieve the existing canvas element with id "canvas"
  let canvas = createCanvas(640, 480);
  canvas.id('canvas'); // Set the id of the canvas

  mobilenet = ml5.imageClassifier('MobileNet', modelReady);

  // Access the webcam video stream
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide(); // Hide the video element since we're drawing it on the canvas
}

function modelReady() {
  console.log('Model ready');
}

function draw() {
  // Draw the current frame from the webcam onto the canvas
  image(video, 0, 0, width, height);
}

function captureAndClassify() {
  // Capture the current frame from the webcam
  let capturedImage = get(0, 0, width, height);

  // Classify the captured image
  mobilenet.classify(capturedImage, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    if (results.length > 0) {
      let label = results[0].label;
      console.log('Label:', label);
    }
  }
}
