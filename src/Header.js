// Header.js
import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, TextField, Button, IconButton, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InfoIcon from '@mui/icons-material/Info';
import './index.css';
import VoiceAssistant from './VoiceAssistant';
import getChatbotResponse from './mainresp'; // Import the responses
import EmailVerification from './adminResponses'; // Import the verification component
import AttachVideo from './AttachVideo'; // Import the AttachVideo component

const Header = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatbox = useRef(null);
  const endOfMessagesRef = useRef(null);
  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState('');
  const [showAttachVideoButton, setShowAttachVideoButton] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]); // Store uploaded videos

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const sendMessage = (message) => {
    if (message.trim() === '') return;

    const newMessage = { text: message, sender: 'user' };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput('');

    if (message.toLowerCase() === 'admin') {
      const adminResponse = { text: "Please verify your email for permission.", sender: 'bot' };
      setChatMessages((prevMessages) => [...prevMessages, adminResponse]);
      setShowVerification(true);
      return;
    }

    // Check if the message is for events videos
    if (message.toLowerCase() === 'events videos') {
      handleEventsVideos();
      return;
    }

    setTimeout(() => {
      const botResponse = getChatbotResponse(message);
      const newMessage = { text: botResponse, sender: 'bot' };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    }, 300);
  };

  const handleEventsVideos = () => {
    if (uploadedVideos.length > 0) {
      const videoResponse = { text: "Recently Uploaded videos:", sender: 'bot' };
      setChatMessages((prevMessages) => [...prevMessages, videoResponse]);
      uploadedVideos.forEach(video => {
        const videoMessage = { 
          text: <video src={URL.createObjectURL(video)} controls style={{ maxWidth: '100%', height: 'auto' }} />, 
          sender: 'bot' 
        };
        setChatMessages((prevMessages) => [...prevMessages, videoMessage]);
      });
    } else {
      const noVideosResponse = { text: "No videos uploaded yet.", sender: 'bot' };
      setChatMessages((prevMessages) => [...prevMessages, noVideosResponse]);
    }
  };

  const handleInfoClick = () => {
    const contactMessage = (
      <Typography variant="body1" color={'black'}>
        Contact Information:<a href="https://www.instagram.com/mec.edu.in" target="_blank" rel="noopener noreferrer">Instagram</a>
      </Typography>
    );
    setChatMessages((prevMessages) => [...prevMessages, { text: contactMessage, sender: 'bot' }]);
  };

  const handleVoiceInput = (speechResult) => {
    sendMessage(speechResult);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(userInput);
    }
  };

  const handleVerificationComplete = (email) => {
    setEmail(email);
    setShowVerification(false);
    setShowAttachVideoButton(true);
    const successMessage = { text: "Email verified successfully!", sender: 'bot' };
    setChatMessages((prevMessages) => [...prevMessages, successMessage]);
  };
  
  const handleVideoUpload = (videoFiles) => {
    setUploadedVideos((prevVideos) => [...prevVideos, ...videoFiles]); // Store all uploaded videos
    const videoMessage = { text: `Uploaded ${videoFiles.length} video(s) successfully!`, sender: 'bot' };
    setChatMessages((prevMessages) => [...prevMessages, videoMessage]);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 30 }}>
      {/* Header */}
      <Container
        sx={{
          backgroundColor: 'rgb(255,255,255)',
          padding: 3,
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img
          src={process.env.PUBLIC_URL + '/main-logo.png'}
          alt="Chatbot"
          className="logo"
          style={{ width: '60%', height: '10' }}
        />
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontFamily: 'kolker brush',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          MecMate
        </Typography>
        <IconButton onClick={handleInfoClick}>
          <InfoIcon />
        </IconButton>
      </Container>

      {/* Chatbox */}
      <Box
        ref={chatbox}
        sx={{
          width: '96%',
          height: '400px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFFFF',
          margin: '20px 0',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Chat messages display area */}
        <Box sx={{ flexGrow: 1, marginBottom: '16px' }}>
          {chatMessages.map((message, index) => (
            <div
              key={index}
              style={{
                textAlign: message.sender === 'user' ? 'right' : 'left',
                marginBottom: '10px',
              }}
            >
              <Typography
                variant="body1"
                style={{
                  backgroundColor: message.sender === 'user' ? '#007bff' : '#808080',
                  color: 'white',
                  display: 'inline-block',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  maxWidth: '70%',
                }}
              >
                {typeof message.text === 'string' ? message.text : message.text}
              </Typography>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </Box>

        {/* Conditional rendering of EmailVerification */}
        {showVerification && (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)', 
              zIndex: 1, 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            }}
          >
            <EmailVerification onVerify={handleVerificationComplete} />
          </Box>
        )}
      </Box>

      {/* Message Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '20px',
          background: '#FFFFFF',
          borderRadius: '10px',
          paddingRight: '10px',
          marginBottom: '10px',
        }}
      >
        <TextField
          type="text"
          placeholder="Type your message here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          sx={{ flexGrow: 1, marginRight: '2px' }}
          onKeyDown={handleKeyDown}
        />
        <VoiceAssistant onVoiceInput={handleVoiceInput} />
        <Button variant="rounded" onClick={() => sendMessage(userInput)}>
          <ArrowUpwardIcon />
        </Button>

        {/* Attach Video Component - only show if email is verified */}
        {showAttachVideoButton && (
          <AttachVideo onVideoUpload={handleVideoUpload} />
        )}
      </div>
    </Container>
  );
};

export default Header;
