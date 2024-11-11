import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';

const VoiceAssistant = ({ onVoiceInput }) => {
  const [recognition, setRecognition] = useState(null);
  const [isAssistantEnabled, setIsAssistantEnabled] = useState(false); // Start with assistant disabled

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = 'en-US';

      recognizer.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        onVoiceInput(speechResult);
      };

      recognizer.onerror = (event) => {
        console.error('Speech recognition error', event);
      };

      setRecognition(recognizer);
    } else {
      alert('Speech recognition is not supported in this browser.');
    }

    return () => {
      // Cleanup function to stop recognition when component unmounts
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onVoiceInput]);

  useEffect(() => {
    if (isAssistantEnabled && recognition) {
      recognition.start(); // Start recognition only if assistant is enabled and recognition object exists
    } else if (recognition) {
      recognition.stop(); // Stop recognition if assistant is disabled and recognition object exists
    }
  }, [isAssistantEnabled, recognition]);

  const handleVoiceCommand = (command) => {
    if (command === 'enable voice assistant') {
      setIsAssistantEnabled(true);
    } else if (command === 'disable voice assistant') {
      setIsAssistantEnabled(false);
    }
  };

  return (
    <IconButton onClick={() => handleVoiceCommand('enable voice assistant')}>
      <MicIcon />
    </IconButton>
  );
};

export default VoiceAssistant;