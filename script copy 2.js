/** @format */
// experimenting w/ more direct version

const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = async() => {
      videoElement.play();
    };
  } catch (error) {
    console.log('error on selectMediaStream:', error);
  }
}

button.addEventListener('click', async() => {
  // Disable Button
  button.disabled = true;
  //Start Picture in Picture
  await videoElement.requestPictureInPicture();
  // Reset Button
  button.disabled = false;
});

// On Load

// async function onLoad() {
//   await selectMediaStream();
// setTimeout(() => button.dispatchEvent(new Event('click')), 2000);
/* Above doesn't work -- still get:
    script.js:35 Uncaught (in promise) DOMException: Failed to execute 'requestPictureInPicture' on 'HTMLVideoElement': Must be handling a user gesture if there isn't already an element in Picture-in-Picture.
      at HTMLButtonElement.<anonymous> (http://127.0.0.1:5500/picture-in-picture/script.js:35:22)
      at http://127.0.0.1:5500/picture-in-picture/script.js:44:27
  
But actually clicking on button DOES work (IF button not disabled by dispatchEvent above)
*/
// }

// onLoad();

selectMediaStream();