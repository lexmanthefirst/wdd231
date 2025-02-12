const _question = document.getElementById("question");
const _options = document.querySelector(".quiz-options");
const _checkBtn = document.getElementById("check-answer");
const _playAgainBtn = document.getElementById("play-again");
const _result = document.getElementById("result");
const _correctScore = document.getElementById("correct-score");
const _totalQuestion = document.getElementById("total-question");
const _categorySelect = document.getElementById("category-select");
const _startQuizBtn = document.getElementById("start-quiz");
const _quizContainer = document.getElementById("quiz-container");

let correctAnswer = "",
  correctScore = (askedCount = 0),
  totalQuestion = 10;
let selectedCategory = "";

// Event Listeners
_categorySelect.addEventListener("change", function () {
  selectedCategory = _categorySelect.value;
});

_startQuizBtn.addEventListener("click", function () {
  if (selectedCategory) {
    _quizContainer.classList.remove("hidden");
    loadQuestion();
  } else {
    alert("Please select a topic first!");
  }
});

_checkBtn.addEventListener("click", checkAnswer);
_playAgainBtn.addEventListener("click", restartQuiz);

// Load question from API with selected category
async function loadQuestion() {
  const APIUrl = `https://opentdb.com/api.php?amount=1&category=${selectedCategory}`;
  const result = await fetch(APIUrl);
  const data = await result.json();

  _result.innerHTML = "";
  showQuestion(data.results[0]);
}

// Display question and options
function showQuestion(data) {
  _checkBtn.disabled = false;
  correctAnswer = data.correct_answer;
  let incorrectAnswers = data.incorrect_answers;
  let optionsList = [...incorrectAnswers];

  // Insert correct answer randomly
  optionsList.splice(
    Math.floor(Math.random() * (incorrectAnswers.length + 1)),
    0,
    correctAnswer
  );

  _question.innerHTML = `${data.question} <br> <span class="category">${data.category}</span>`;
  _options.innerHTML = optionsList
    .map((option, index) => `<li>${index + 1}. <span>${option}</span></li>`)
    .join("");

  selectOption();
}

// Handle option selection
function selectOption() {
  _options.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", function () {
      if (_options.querySelector(".selected")) {
        _options.querySelector(".selected").classList.remove("selected");
      }
      option.classList.add("selected");
    });
  });
}

// Check answer
function checkAnswer() {
  _checkBtn.disabled = true;
  if (_options.querySelector(".selected")) {
    let selectedAnswer = _options.querySelector(".selected span").textContent;
    if (selectedAnswer == HTMLDecode(correctAnswer)) {
      correctScore++;
      _result.innerHTML = `<p style="color:green;"><b>Correct Answer!</b></p>`;
    } else {
      _result.innerHTML = `<p style="color:red;"><b>Incorrect Answer!</b></p> 
            <small>Correct Answer: <b>${correctAnswer}</b></small>`;
    }
    checkCount();
  } else {
    _result.innerHTML = `<p style="color:orange;"><b>Please select an option!</b></p>`;
    _checkBtn.disabled = false;
  }
}

// Decode HTML entities
function HTMLDecode(textString) {
  let doc = new DOMParser().parseFromString(textString, "text/html");
  return doc.documentElement.textContent;
}

// Track quiz progress
function checkCount() {
  askedCount++;
  setCount();
  if (askedCount == totalQuestion) {
    setTimeout(() => {
      _result.innerHTML += `<p><b>Your final score is ${correctScore}/${totalQuestion}.</b></p>`;
      _playAgainBtn.classList.remove("hidden");
      _checkBtn.style.display = "none";
    }, 1000);
  } else {
    setTimeout(() => {
      loadQuestion();
    }, 500);
  }
}

// Update score display
function setCount() {
  _totalQuestion.textContent = totalQuestion;
  _correctScore.textContent = correctScore;
}

// Restart Quiz
function restartQuiz() {
  correctScore = askedCount = 0;
  _playAgainBtn.classList.add("hidden");
  _checkBtn.style.display = "block";
  _checkBtn.disabled = false;
  setCount();
  loadQuestion();
}
