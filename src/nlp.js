// Install the natural package
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// Example of tokenizing a sentence
const sentence = "Hello, how are you doing?";
const tokens = tokenizer.tokenize(sentence);
console.log(tokens);

// Using a basic classifier (Naive Bayes) to classify responses
const classifier = new natural.BayesClassifier();

// Training the classifier
classifier.addDocument('hello', 'greetings');
classifier.addDocument('goodbye', 'farewell');
classifier.addDocument('thanks', 'thanks');
classifier.train();

// Classify user input
const userInput = 'hello';
const responseCategory = classifier.classify(userInput);
console.log(responseCategory);  // Output: greetings

// You can map this to predefined responses
const responses = {
  greetings: "Hello! How can I help you?",
  farewell: "Goodbye! Take care.",
  thanks: "You're welcome!"
};

console.log(responses[responseCategory]);  // Output: "Hello! How can I help you?"
