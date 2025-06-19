// State management
let currentAnswer = '';
let correctCount = 0;
let incorrectCount = 0;

// DOM Elements
const elements = {
  fact: document.getElementById('fact'),
  correctCount: document.getElementById('correctCount'),
  incorrectCount: document.getElementById('incorrectCount'),
  buttonContainer: document.getElementById('buttonContainer'),
  result: document.getElementById('result'),
  newFactBtn: document.getElementById('newFactBtn'),
  trueBtn: document.getElementById('trueBtn'),
  falseBtn: document.getElementById('falseBtn')
};

function readCookies(){
  cookies = document.cookie.split('; ')
  cookies.forEach((rawCookie) => {
    cookie = rawCookie.split('=')
    if (cookie[0] == "correctCount"){
      correctCount = cookie[1]
    }    
    if (cookie[0] == "incorrectCount"){
      incorrectCount = cookie[1]
    }
  })
}

// Score Management
function updateScoreDisplay() {
  elements.correctCount.textContent = `Correct: ${correctCount}`;
  elements.incorrectCount.textContent = `Incorrect: ${incorrectCount}`;
}

function incrementCorrectCount() {
  correctCount++;
  updateCookie();
  updateScoreDisplay();
}

function incrementIncorrectCount() {
  incorrectCount++;
  updateCookie();
  updateScoreDisplay();
}

function updateCookie() {
  document.cookie = `correctCount=${correctCount}`;
  document.cookie = `incorrectCount=${incorrectCount}`;
}

// Utility Functions
function sanitizeText(text) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = text;
  return tempDiv.textContent;
}

// UI Updates
function updateQuestionDisplay(question) {
  elements.fact.textContent = sanitizeText(question);
}

function showLoadingState() {
  elements.fact.textContent = 'Loading...';
  elements.buttonContainer.style.display = 'none';
  elements.result.style.display = 'none';
  elements.newFactBtn.style.display = 'none';
}

function showQuestionState() {
  elements.buttonContainer.style.display = 'block';
}

function showErrorState() {
  elements.fact.innerHTML = 'Failed to load fact &#128546; Please try again in a few seconds.';
  console.error('Failed to load fact');
}

function showResultState(isCorrect) {
  elements.buttonContainer.style.display = 'none';
  elements.result.style.display = 'block';
  elements.result.textContent = isCorrect 
    ? 'Correct! Well done!' 
    : `Incorrect. The correct answer was ${currentAnswer}.`;
  startTimerAndTimeout(5);
}

function showNewFactBtn() {
  elements.newFactBtn.style.display = 'block';
}

// API Calls
async function fetchQuestionFromAPI() {
  const response = await fetch('https://opentdb.com/api.php?amount=1&type=boolean');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

// Event Handlers
function handleAnswer(userAnswer) {
  const isCorrect = userAnswer === currentAnswer;
  if (isCorrect) {
    incrementCorrectCount();
  } else {
    incrementIncorrectCount();
  }
  showResultState(isCorrect);
}

async function handleNewQuestion() {
  try {
    showLoadingState();
    const data = await fetchQuestionFromAPI();
    const question = data.results[0].question;
    currentAnswer = data.results[0].correct_answer;
    updateQuestionDisplay(question);
    showQuestionState();
  } catch (error) {
    showErrorState();
    startTimerAndTimeout(5);
  }
}

function startTimerAndTimeout(n) {
  startTimer(n);
  setTimeout(() => {
    handleNewQuestion();
  }, n * 1000);  
}

function startTimer(n) {
  const div = document.createElement('div');
  div.id = 'countdown';
  document.body.appendChild(div);
  let count = n;
  div.textContent = `${count} seconds remaining until next question`;
  const interval = setInterval(() => {
    count--;
    if (count <= 0) {
      div.remove();
      clearInterval(interval);
    } else {
      div.textContent = `${count} seconds remaining until next question`;
    }
  }, 1000);
}

// Initialize
function initializeEventListeners() {
  elements.trueBtn.onclick = () => handleAnswer('True');
  elements.falseBtn.onclick = () => handleAnswer('False');
  elements.newFactBtn.onclick = handleNewQuestion;
}

// Start the application
function startApp() {
  initializeEventListeners();
  handleNewQuestion();
}

readCookies();
updateScoreDisplay();
startApp(); 
