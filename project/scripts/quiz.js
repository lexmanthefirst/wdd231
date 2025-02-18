import { darkMode, CopyWrite } from "./app.mjs";

//Toggle dark mode
darkMode();
//get copywrite
CopyWrite();

const backBtn = document.querySelector("#previous-btn");

backBtn.addEventListener("click", () => {
  window.history.back();
});

const quizContainer = document.getElementById("quiz-container");
const categorySelect = document.getElementById("category-select");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const checkBtn = document.getElementById("check-answer");
const playAgainBtn = document.getElementById("play-again");
const resultElement = document.getElementById("result");
const correctScoreElement = document.getElementById("correct-score");
const totalQuestionElement = document.getElementById("total-question");
const progressBar = document.querySelector(".progress");
const startQuizBtn = document.getElementById("start-quiz");
let correctAnswer = "";
let correctScore = 0;
let askedCount = 0;
const totalQuestion = 10;
let selectedCategory = "";

// Event Listeners
checkBtn.addEventListener("click", checkAnswer);
playAgainBtn.addEventListener("click", restartQuiz);

async function loadQuestion() {
// if (!selectedCategory) {
//   alert("Please select a topic first!");
//   return;
// }
try{
    const APIUrl = `https://opentdb.com/api.php?amount=1&category=${selectedCategory}`;
    const response = await fetch(APIUrl);
    const data = await response.json();
      if(data.results.length > 0){
            displayQuestion(data.results[0]);
            updateProgress();
      }else{
        resultElement.innerHTML = `<p style="color: red;"><b>Failed to load question. Try again!</b></p>`
      }
  
} catch(error){
    console.error("Error fetching data:", error)
    resultElement.innerHTML = `<p style="color: red;"><b>Failed to load question. Try again!</b></p>`
}
}
categorySelect.addEventListener("change", function (){
selectedCategory = categorySelect.value;

});

startQuizBtn.addEventListener("click", function () {
if (selectedCategory) {
    correctAnswer = askedCount = 0;
    quizContainer.classList.remove("hidden");

    loadQuestion();
} else {
    resultElement.innerHTML = `<p style="color: red;"><b>Please select a topic first!</b></p>`;
}
});





function displayQuestion(data) {
  correctAnswer = data.correct_answer;
  const options = [...data.incorrect_answers];
  options.splice(Math.floor(Math.random() * (options.length + 1)), 0, correctAnswer);

  questionElement.innerHTML = `
      ${data.question}
      <div class="category-tag">${data.category}</div>
  `;

  optionsContainer.innerHTML = options.map((option, index) => `
      <button class="option-btn" data-answer="${option}">
          <span class="option-letter">${String.fromCharCode(65 + index)}.</span>
          ${option}
      </button>
  `).join("");

  optionsContainer.querySelectorAll(".option-btn").forEach(btn => {
      btn.addEventListener("click", selectOption);
  });
}

function selectOption(e) {
  optionsContainer.querySelectorAll(".option-btn").forEach(btn => {
      btn.classList.remove("selected");
  });
  e.target.closest(".option-btn").classList.add("selected");
}

function checkAnswer() {
  const selectedBtn = optionsContainer.querySelector(".selected");
  if (!selectedBtn) {
      showResult("Please select an option!", "orange");
      return;
  }

  const selectedAnswer = selectedBtn.dataset.answer;
  const isCorrect = selectedAnswer === correctAnswer;

  if (isCorrect) {
      correctScore++;
      correctScoreElement.textContent = correctScore;
      showResult("Correct Answer!", "green");
  } else {
      showResult(`Incorrect! Correct answer: ${correctAnswer}`, "red");
  }

  askedCount++;
  updateProgress();

  if (askedCount === totalQuestion) {
      endQuiz();
  } else {
      setTimeout(loadQuestion, 1000);
  }
}

function showResult(message, color) {
  resultElement.innerHTML = `<p style="color: ${color}">${message}</p>`;
}

function updateProgress() {
  const progress = (askedCount / totalQuestion) * 100;
  progressBar.style.width = `${progress}%`;
}

function endQuiz() {
  checkBtn.classList.add("hidden");
  playAgainBtn.classList.remove("hidden");
  showResult(`Final Score: ${correctScore}/${totalQuestion}`, "var(--primary)");
}

function restartQuiz() {
  correctScore = 0;
  askedCount = 0;
  correctScoreElement.textContent = "0";
  playAgainBtn.classList.add("hidden");
  checkBtn.classList.remove("hidden");
  resultElement.innerHTML = "";
  loadQuestion();
  updateProgress();
}

// Initialize quiz
loadQuestion();