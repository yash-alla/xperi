let label = "waiting...";
// The classifier
let classifier;

// STEP 1: Load the model!
function preload() {
  let subj = getCookie('sub');
console.log(subj);
let modelURL = decodeURIComponent(getCookie(subj));
  classifier = ml5.imageClassifier(modelURL + 'model.json');
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
          return cookie.substring(name.length + 1);
      }
  }

  // If the cookie isn't found, return null
  return null;
}

function setup() {
  // Load an image (replace "path/to/your/image.jpg" with your actual image path)
  let s= "https://nextio.in/ARI/AR/img/" + getCookie('nme');
  alert(s);
  const image = loadImage(s);

  // Classify the image (no need for a loop)
  classifier.classify(image, gotResults);
}

function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label
  label = results[0].label;

  // Output the label (e.g., console log, alert, DOM manipulation)
  console.log("Classified label:", label);
  const d = new Date();
  d.setTime(d.getTime() + (1*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = "clf" + "=" + label + ";" + expires + ";path=/";
  alert('ok');
  window.location.href = "../dense.php?g=2";

  // You can also use alert(label) or modify the DOM to display the label
}
