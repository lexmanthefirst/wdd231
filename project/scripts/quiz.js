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
const nextQuestionBtn = document.getElementById("next-question");
const prevQuestionBtn = document.getElementById("prev-question");

let correctScore = 0;
let askedCount = 0;
const totalQuestion = 10;
let selectedCategory = "";
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = {}; // Stores selected answers
let answeredQuestions = new Set(); // Keeps track of answered questions

// Event Listeners
checkBtn.addEventListener("click", checkAnswer);
playAgainBtn.addEventListener("click", restartQuiz);
nextQuestionBtn.addEventListener("click", nextQuestion);
prevQuestionBtn.addEventListener("click", prevQuestion);
categorySelect.addEventListener("change", () => selectedCategory = categorySelect.value);

startQuizBtn.addEventListener("click", function () {
    if (selectedCategory) {
        correctScore = 0;
        askedCount = 0;
        currentQuestionIndex = 0;
        userAnswers = {};
        answeredQuestions.clear(); // Reset answered questions tracker
        quizContainer.classList.remove("hidden");
        loadQuestions();
    } else {
        resultElement.innerHTML = `<p style="color: red;"><b>Please select a topic first!</b></p>`;
    }
});

async function loadQuestions() {
    if (!selectedCategory) {
        alert("Please select a topic first!");
        return;
    }

    try {
        const APIUrl = `https://opentdb.com/api.php?amount=${totalQuestion}&category=${selectedCategory}`;
        const response = await fetch(APIUrl);
        const data = await response.json();

        if (data.results.length > 0) {
            questions = data.results;
            displayQuestion(currentQuestionIndex);
            updateProgress();
        } else {
            resultElement.innerHTML = `<p style="color: red;"><b>Failed to load questions. Try again!</b></p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        resultElement.innerHTML = `<p style="color: red;"><b>Failed to load questions. Try again!</b></p>`;
    }
}

function displayQuestion(index) {
    let data = questions[index];
    let correctAnswer = data.correct_answer;
    let options = [...data.incorrect_answers];

    options.splice(Math.floor(Math.random() * (options.length + 1)), 0, correctAnswer);

    questionElement.innerHTML = `
        ${data.question}
        <div class="category-tag">${data.category}</div>
    `;

    optionsContainer.innerHTML = options.map((option, i) => `
        <button class="option-btn" data-answer="${option}">
            <span class="option-letter">${String.fromCharCode(65 + i)}.</span>
            ${option}
        </button>
    `).join("");

    optionsContainer.querySelectorAll(".option-btn").forEach(btn => {
        btn.addEventListener("click", selectOption);
    });

    // Reapply the selected answer if it was chosen before
    if (userAnswers[index]) {
        let selectedBtn = [...optionsContainer.children].find(btn => btn.dataset.answer === userAnswers[index]);
        if (selectedBtn) selectedBtn.classList.add("selected");
    }

    // Disable check button if question was already answered
    checkBtn.disabled = answeredQuestions.has(index) ? true : false;
}

function selectOption(e) {
    optionsContainer.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
    e.target.closest(".option-btn").classList.add("selected");
}

function checkAnswer() {
    const selectedBtn = optionsContainer.querySelector(".selected");
    if (!selectedBtn) {
        showResult("Please select an option!", "orange");
        return;
    }

    let selectedAnswer = selectedBtn.dataset.answer;
    userAnswers[currentQuestionIndex] = selectedAnswer;
    let correctAnswer = questions[currentQuestionIndex].correct_answer;

    // Prevent re-answering the same question
    if (answeredQuestions.has(currentQuestionIndex)) {
        showResult("You have already answered this question!", "orange");
        return;
    }

    if (selectedAnswer === correctAnswer) {
        correctScore++;
        correctScoreElement.textContent = correctScore;
        showResult("Correct Answer!", "green");
    } else {
        showResult(`Incorrect! Correct answer: ${correctAnswer}`, "red");
    }

    askedCount++;
    answeredQuestions.add(currentQuestionIndex); // Mark question as answered
    updateProgress();

    // Disable check button after answering
    checkBtn.disabled = true;

    if (askedCount === totalQuestion) {
        endQuiz();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
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
    currentQuestionIndex = 0;
    userAnswers = {};
    answeredQuestions.clear();
    correctScoreElement.textContent = "0";
    playAgainBtn.classList.add("hidden");
    checkBtn.classList.remove("hidden");
    resultElement.innerHTML = "";
    loadQuestions();
    updateProgress();
}
