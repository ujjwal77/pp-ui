// import React, { useState } from 'react';

// function AudioUpload() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     const formData = new FormData();
//     formData.append('audioFile', selectedFile);

//     // Make an HTTP POST request to your server with the formData
//     fetch('https://example.com/upload-audio', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => {
//         // Handle the server's response
//         console.log('File uploaded successfully', response);
//       })
//       .catch((error) => {
//         console.error('Error uploading file', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Audio Upload</h1>
//       <input type="file" accept="audio/*" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }

// export default AudioUpload;


import React, { useState, useRef } from 'react';
import axios from 'axios';

function AudioUpload() {
  const [recording, setRecording] = useState(false);
  const audioChunks = useRef([]);
  const mediaRecorder = useRef(null);

  const startRecording = () => {
    audioChunks.current = [];
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);

        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunks.current.push(e.data);
          }
        };

        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, {
            type: 'audio/wav', // Adjust the format as needed
          });
          uploadAudio(audioBlob);
        };

        mediaRecorder.current.start();
        setRecording(true);
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder.current && recording) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  };

  const uploadAudio = (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.wav');

    console.log(formData)

    axios
      .post('https://example.com/upload-audio', formData)
      .then((response) => {
        console.log('Audio uploaded successfully', response);
      })
      .catch((error) => {
        console.error('Error uploading audio:', error);
      });
  };

  return (
    <div>
      <h1>Audio Recorder</h1>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
    </div>
  );
}

export default AudioUpload;
