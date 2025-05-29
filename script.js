// State management
let currentAnswer = '';

// DOM Elements
const elements = {
  fact: document.getElementById('fact'),
  buttonContainer: document.getElementById('buttonContainer'),
  result: document.getElementById('result'),
  newFactBtn: document.getElementById('newFactBtn'),
  trueBtn: document.getElementById('trueBtn'),
  falseBtn: document.getElementById('falseBtn')
};

// UI Updates
function updateQuestionDisplay(question) {
  elements.fact.textContent = question;
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
  elements.fact.textContent = 'Failed to load fact. Please try again in a few seconds.';
  console.error('Failed to load fact');
}

function showResultState(isCorrect) {
  elements.buttonContainer.style.display = 'none';
  elements.result.style.display = 'block';
  elements.result.textContent = isCorrect 
    ? 'Correct! Well done!' 
    : `Incorrect. The correct answer was ${currentAnswer}.`;
    showNewFactBtn();
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
    startTimer();
    setTimeout(() => {
      showNewFactBtn();
    }, 3000);
  }
}

function startTimer() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  let count = 1;
  div.textContent = count;
  const interval = setInterval(() => {
    count++;
    if (count > 3) {
      div.remove();
      clearInterval(interval);
    } else {
      div.textContent = count;
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

startApp(); 