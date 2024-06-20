// Get access to the video element
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const capturedImage = document.getElementById('capturedImage');
const context = canvas.getContext('2d');

// Request access to the user's webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error("Error accessing the webcam: " + err);
    });

// Capture a photo when the button is clicked
captureButton.addEventListener('click', () => {
    // Draw the current frame from the video onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the data URL of the image
    const imageDataURL = canvas.toDataURL('image/jpeg');

    // Display the captured image
    capturedImage.src = imageDataURL;

    // Save the image to local storage
    localStorage.setItem('capturedImage', imageDataURL);
});

// Load the captured image from local storage if it exists
window.addEventListener('load', () => {
    const savedImageDataURL = localStorage.getItem('capturedImage');
    if (savedImageDataURL) {
        capturedImage.src = savedImageDataURL;
    }
});
