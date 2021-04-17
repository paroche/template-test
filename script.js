/** @format */
// Streamlined

const videoElement = document.getElementById('video');
const button = document.getElementById('button'); // Seem to need to have button for user to click. Picture-in-picture requires user action

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
  button.disabled = true;
  await videoElement.requestPictureInPicture();
  button.disabled = false;
});

// On Load
selectMediaStream();