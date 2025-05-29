let currentAnswer = ''; // Store the answer for comparison

function fetchQuestion() {
  document.getElementById('fact').textContent = 'Loading...';
  document.getElementById('buttonContainer').style.display = 'none';
  document.getElementById('result').style.display = 'none';
  document.getElementById('newFactBtn').style.display = 'none';

  fetch('https://opentdb.com/api.php?amount=1&type=boolean')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      const question = data.results[0].question;
      currentAnswer = data.results[0].correct_answer;
      document.getElementById('fact').textContent = question;
      document.getElementById('buttonContainer').style.display = 'block';
    })
    .catch(err => {
      document.getElementById('fact').textContent = 'Failed to load fact. Please try again in a few seconds.';
      console.error(err);
    });
}

function handleAnswer(userAnswer) {
  document.getElementById('buttonContainer').style.display = 'none';
  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  
  if (userAnswer === currentAnswer) {
    resultDiv.textContent = 'Correct! Well done!';
  } else {
    resultDiv.textContent = `Incorrect. The correct answer was ${currentAnswer}.`;
  }
  
  document.getElementById('newFactBtn').style.display = 'block';
}

document.getElementById('trueBtn').onclick = () => handleAnswer('True');
document.getElementById('falseBtn').onclick = () => handleAnswer('False');
document.getElementById('newFactBtn').onclick = fetchQuestion;

// Load first question
fetchQuestion(); 