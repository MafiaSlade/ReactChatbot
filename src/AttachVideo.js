// AttachVideo.js
import React, { useState } from 'react';
import { Button } from '@mui/material';

const AttachVideo = ({ onVideoUpload }) => {
  const [videoFiles, setVideoFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setVideoFiles((prevFiles) => [...prevFiles, ...files]);
    // Call the parent function to handle the upload
    onVideoUpload(files);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Button variant="contained" component="label" color="primary">
        Attach Video
        <input
          accept="video/*"
          type="file"
          hidden
          multiple
          onChange={handleFileChange}
        />
      </Button>
    </div>
  );
};

export default AttachVideo;
