// src/utils/chatbotResponses.js
import { Typography, Link } from '@mui/material';
import nlp from 'compromise';

const collegeInfo = {
  college_name: "MUTHAYAMMAL ENGINEERING COLLEGE",
  principal_name: "DR.MADHESWARAN",
  class_advisor: "THENMOZHI MAM"
};

const classInfo = {
  class_name: "AI & DS Class B",
  student_names: ["Selvarasan", "Dharun Prakash", "Lenin", "Vigneshwar", "Vetree","Viswak","Moulee","..."]
};

const responses = {
  greetings: [
    "Hello Selvarasan!",
    "Hi there!",
    "Hey! How can I assist you?",
    "Hi, what can I do for you?",
    "Howdy!",
    "Hey there, how are you?",
    "Hello! How may I help you today?",
    "Hi! What's up?"
  ],
  farewell: [
    "Goodbye!",
    "See you later!",
    "Take care Selvarasan!",
    "Farewell!",
    "Until next time!",
    "Bye for now!",
    "Catch you later!",
    "Have a great day!",
    "Goodbye! Take care!",
    "Adios!",
    "So long!"
  ],
  thanks: [
    "Thank you!",
    "Thanks a lot!",
    "Thanks a bunch!",
    "Appreciate it!",
    "Thanks so much!",
    "Thank you very much!",
    "Thanks for your help!",
    "I'm grateful, thanks!",
    "Thanks a million!",
    "Thanks for everything!",
    "Thank you kindly!"
  ],
  "you're welcome": [
    "You're welcome!",
    "No problem!",
    "It was my pleasure!",
    "Anytime!",
    "Glad to help!",
    "Don't mention it!",
    "Happy to assist!",
    "You got it!",
    "Sure thing!",
    "Of course!",
    "Always here to help!"
  ],
  about: [
    "I am a simple Mec Personal Chatbot created using MERN Stack!",
    "I'm a Mec Personal Chatbot designed to assist you with various tasks.",
    "I'm just a humble Mec Personal Chatbot here to help you out!",
    "I am an AI-powered Mec Personal Chatbot programmed to assist you.",
    "I'm here to answer your questions and provide assistance.",
    "I'm a virtual assistant programmed to respond to your queries.",
    "I'm your friendly Mec Personal Chatbot ready to lend a hand!",
    "I'm an artificial intelligence designed to interact with users like you!",
    "I'm a digital assistant programmed to make your life easier.",
    "I am a Mec Personal Chatbot powered by AI to help you with your inquiries.",
    "I'm a virtual helper designed to make your day a bit smoother."
  ],
  fallback: [
    "Sorry, I didn't get that. Can you please rephrase?",
    "I'm not sure I understand. Could you provide more details?",
    "Apologies, I didn't catch that. Can you repeat?",
    "Hmm, I'm having trouble understanding. Can you try again?",
    "I'm afraid I didn't comprehend that. Can you try a different wording?",
    "I didn't quite catch that. Can you please clarify?",
    "I'm sorry, I couldn't understand what you said. Can you try saying it differently?",
    "It seems like I didn't get that. Can you provide more context?",
    "I'm having difficulty understanding. Can you please elaborate?",
    "I'm sorry, I'm not sure what you're asking. Can you try rephrasing?"
  ]
};

const intents = {
  welcome: ['welcome'],
  about_college: ['about college'],
  location: ['location', 'where is', 'address'],
  courses: ['courses', 'programs', 'majors'],
  total_students: ['total students', 'number of students', 'student count'],
  laboratories: ['laboratories', 'labs', 'facilities'],
  principal_name: ['principal name', 'who is the principal'],
  class_advisor_name: ['class advisor name', 'who is the class advisor'],
  class_name: ['class name', 'which class'],
  student_names: ['students name', 'who are the students'],
  hod_ai_ds: ['hod of ai&ds', 'head of ai&ds'],
  hod_cse: ['hod of cse', 'head of cse'],
  hod_cybersecurity: ['hod of cybersecurity', 'head of cybersecurity'],
  hod_ece: ['hod of ece', 'head of ece'],
  creator: ['who created you', 'who made you'],
  joint_secretary: ['joint secretary name', 'who is the joint secretary'],
  secretary: ['secretary name', 'who is the secretary'],
  advisor_ai_ds: ['class advisor of ai&ds department', 'who is the advisor for ai&ds'],
  events_videos: ['events videos', 'videos of events'],
  who_are_you: ['who are you', 'what are you']
};

const getChatbotResponse = (userMessage) => {
  const doc = nlp(userMessage.toLowerCase());
  const normalizedMessage = doc.out('text');

  for (let intent in intents) {
    if (intents[intent].some(phrase => normalizedMessage.includes(phrase))) {
      return handleIntent(intent);
    }
  }

  return getAdditionalResponse(normalizedMessage);
};

const handleIntent = (intent) => {
  switch (intent) {
    case 'welcome':
      return 'Welcome to the MecMate! How can I assist you today?';
    case 'about_college':
      return `${collegeInfo.college_name} is an autonomous institution affiliated to Anna University accredited by NAAC and NBA.`;
    case 'location':
      return (
        <Typography>
          The location of {collegeInfo.college_name} is in Rasipuram. Here is the location link: {' '}
          <Link href="https://maps.app.goo.gl/gR3inY8kNfqj5aXJ6" target="_blank" rel="noopener">
            View Map
          </Link>
        </Typography>
      );
    case 'courses':
      return 'We offer various courses including B.E. in Computer Science, ECE, and Mechanical Engineering.';
    case 'total_students':
      return 'We have approximately 1,200 students enrolled.';
    case 'laboratories':
      return 'We have state-of-the-art laboratories for each department.';
    case 'principal_name':
      return collegeInfo.principal_name;
    case 'class_advisor_name':
      return collegeInfo.class_advisor;
    case 'class_name':
      return classInfo.class_name;
    case 'student_names':
      return `Students in the class: ${classInfo.student_names.join(', ')}.`;
    case 'hod_ai_ds':
      return 'The head of the AI & DS department is Dr. ABC.';
    case 'hod_cse':
      return 'The head of the CSE department is Dr. XYZ.';
    case 'hod_cybersecurity':
      return 'The head of the Cybersecurity department is Dr. DEF.';
    case 'hod_ece':
      return 'The head of the ECE department is Dr. GHI.';
    case 'creator':
      return "I was created by the talented team at MecMate.Mr.R.Selvarasan who guided through this projects";
    case 'joint_secretary':
      return 'The joint secretary is Mr. JKL.';
    case 'secretary':
      return 'The secretary is Ms. MNO.';
    case 'advisor_ai_ds':
      return 'The class advisor for the AI & DS department is Mrs. PQR.';
    case 'events_videos':
      return 'Please log in to access the event videos.';
    case 'who_are_you':
      return "I'm MecMate, your personal assistant!";
      case 'hey,whats up':
      return "I doing great,whats yours";
    default:
      return "I'm not sure how to respond to that.";
  } 
};

const getAdditionalResponse = (normalizedMessage) => {
  if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  }
  if (normalizedMessage.includes('bye') || normalizedMessage.includes('goodbye')) {
    return responses.farewell[Math.floor(Math.random() * responses.farewell.length)];
  }
  if (normalizedMessage.includes('thank you')) {
    return responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
  }
  if (normalizedMessage.includes("you're welcome")) {
    return responses["you're welcome"][Math.floor(Math.random() * responses["you're welcome"].length)];
  }
  if (normalizedMessage.includes('about')) {
    return responses.about[Math.floor(Math.random() * responses.about.length)];
  }
  
  return responses.fallback[Math.floor(Math.random() * responses.fallback.length)];
};

export default getChatbotResponse ;
