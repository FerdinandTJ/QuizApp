let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let questions = [
    { type: 'choice', question: 'Berapakah hasil dari 8 + 5?', choices: ['11', '12', '13','14'], answer: '13', points: 10 },
    { type: 'choice', question: 'Berapakah hasil dari 9 - 4?', choices: ['3', '4', '5','6'], answer: '5', points: 10 },
    { type: 'text', question: 'Berapakah hasil dari 6 dikali 3?', answer: '18', points: 10 },
    { type: 'text', question: 'Sebuah kotak berisi 15 pensil. Jika 6 pensil dipinjam oleh teman, berapa pensil yang tersisa di dalam kotak?', answer: '9', points: 10 }
];
let playerData = {};
let answeredQuestions = Array(questions.length).fill(false);

document.getElementById('player-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    playerData.name = document.getElementById('name').value;
    playerData.nim = document.getElementById('nim').value;
    location.href = 'quiz.html';
});

function startQuiz() {
    createNavigation();
    showQuestion();
    startTimer();
}

function createNavigation() {
    let navContainer = document.getElementById('question-navigation');
    navContainer.innerHTML = ''; // Bersihkan navigasi sebelumnya
    questions.forEach((_, index) => {
        let button = document.createElement('button');
        button.innerText = index + 1;
        button.onclick = () => navigateToQuestion(index);
        button.classList.toggle('completed', answeredQuestions[index]); // Tandai soal yang sudah dijawab
        navContainer.appendChild(button);
    });
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    let questionData = questions[currentQuestionIndex];
    document.getElementById('question-number').innerText = `Question ${currentQuestionIndex + 1}`;
    document.getElementById('question').innerText = questionData.question;
    let choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    let answerInput = document.getElementById('answer');
    
    // Menampilkan atau menyembunyikan input jawaban sesuai tipe soal
    answerInput.style.display = questionData.type === 'text' ? 'block' : 'none';
    answerInput.value = ''; // Reset input untuk soal isian

    if (questionData.type === 'choice') {
        questionData.choices.forEach((choice) => {
            let button = document.createElement('button');
            button.innerText = choice;
            button.onclick = () => answerQuestion(choice);
            choicesDiv.appendChild(button);
        });
    }

    updateNavigation();
    startTimer(); // Reset timer untuk soal baru
}

function answerQuestion(answer = null) {
  let questionData = questions[currentQuestionIndex];
  
  // For text questions, get the value from the input
  if (questionData.type === 'text') {
      answer = document.getElementById('answer').value.trim();
      console.log(answer)
  }


  // Check answer and update score
  if (answer === questionData.answer) {
      score += questionData.points;
      answeredQuestions[currentQuestionIndex] = true; // Mark question as answered
  } else {
      answeredQuestions[currentQuestionIndex] = false;
  }

  // // Update navigation buttons and move to next question
  updateNavigation();
  currentQuestionIndex++;
  clearInterval(timer);
  showQuestion();
  startTimer();
}

function startTimer() {
  clearInterval(timer); // Ensure no previous timer interferes
  let timeLeft = 30;
  document.getElementById('time-left').innerText = timeLeft;
  timer = setInterval(() => {
      timeLeft--;
      document.getElementById('time-left').innerText = timeLeft;
      if (timeLeft === 0) {
          clearInterval(timer);
          nextQuestion();
      }
  }, 1000);
}

function nextQuestion() {
    clearInterval(timer);
    currentQuestionIndex++;
    showQuestion();
}

function navigateToQuestion(index) {
    clearInterval(timer);
    currentQuestionIndex = index;
    showQuestion();
}

function updateNavigation() {
  let navButtons = document.querySelectorAll('#question-navigation button');
  navButtons.forEach((button, index) => {
      button.classList.toggle('active', index === currentQuestionIndex); // Highlight current question
      button.classList.toggle('completed', answeredQuestions[index]); // Mark answered questions as green
  });
}

function endQuiz() {
    playerData.score = score;
    localStorage.setItem('playerData', JSON.stringify(playerData));
    location.href = 'result.html';
}

function showResult() {
  let playerData = JSON.parse(localStorage.getItem('playerData')) || {};
  document.getElementById('player-name').innerText = `Name: ${playerData.name || ''}`;
  document.getElementById('player-nim').innerText = `NIM: ${playerData.nim || ''}`;
  document.getElementById('total-score').innerText = `Total Score: ${playerData.score || 0}`;
}


if (document.location.pathname.endsWith('quiz.html')) startQuiz();
if (document.location.pathname.endsWith('result.html')) showResult();
