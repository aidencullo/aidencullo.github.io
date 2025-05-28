fetch('https://opentdb.com/api.php?amount=1&type=boolean')
  .then(res => {
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
  })
  .then(data => {
    const question = data.results[0].question;
    const answer = data.results[0].correct_answer;
    document.getElementById('fact').innerHTML = `${question} <br><strong>${answer}</strong>`;
  })
  .catch(err => {
    document.getElementById('fact').textContent = 'Failed to load fact. Please try again in a few seconds.';
    console.error(err);
  });

function handleAnswer() {
  document.getElementById('buttonContainer').style.display = 'none';
  document.getElementById('result').style.display = 'block';
}

document.getElementById('trueBtn').onclick = handleAnswer;
document.getElementById('falseBtn').onclick = handleAnswer; 