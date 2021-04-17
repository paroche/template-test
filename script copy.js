/** @format */

const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia(); // * navigator api
    videoElement.srcObject = mediaStream; // * srcObject property of HTMLMediaElement inherited by video element?, video onloadedmetadata event?
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log('error on selectMediaStream:', error);
  }
}

button.addEventListener('click', async() => {
  // Disable Button
  button.disabled = true;
  // Trying putting both functions on click. 
  // selectMediaStream(); // gives same error whether await or not
  /*
  Doesn't seem to work -- says:
  script.js:26 Uncaught (in promise) DOMException: Failed to execute 'requestPictureInPicture' on 'HTMLVideoElement': Metadata for the video element are not loaded yet.
    at HTMLButtonElement.<anonymous> (http://127.0.0.1:5500/picture-in-picture/script.js:26:22)
  */

  // Start Picture in Picture
  await videoElement.requestPictureInPicture(); // * requestPictureInPicture method of video element?
  // Reset Button
  button.disabled = false;
});

// On Load
selectMediaStream();

// Seems dumb to even have button, should just make picture in picture when have selected media stream