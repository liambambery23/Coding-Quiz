
let timer;
let time = myQuestions.length * 15;
let currentQuestionIndex = 0;


// Create variables for HTML elements
let questionsEl = document.getElementById("questions");
let timerEl = document.getElementById("time");
let optionsEl = document.getElementById("options");
let submitBtn = document.getElementById("submit");

let startBtn = document.getElementById("start-button");
let nameEl = document.getElementById("name");
let answerEl = document.getElementById("answer");


//Function for starting the quiz 
function startQuiz() {
    let startPageEl = document.getElementById("start-page");
    startPageEl.setAttribute("class", "hidden");
    questionsEl.removeAttribute("class");
    timer = setInterval(clockCountDown, 1000);
    timer.textContent = time;
    showQuestions();
} 

function showQuestions() {
    let currentQuestion = myQuestions[currentQuestionIndex];

    let questionName = document.getElementById("question-name");
    questionName.textContent = currentQuestion.question;
    
    optionsEl.innerHTML = "";

    currentQuestion.options.forEach(function(options, i) {
        let optionBtn = document.createElement("button");
        optionBtn.setAttribute("class", "options");
        optionBtn.setAttribute("value", options);

        optionBtn.textContent = i + 1 + "." + options;

        optionBtn.onclick = checkAnswer;

        optionsEl.appendChild(optionBtn)
    });
}

function checkAnswer() {

    
    if (this.value !== myQuestions[currentQuestionIndex].answer) {
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        timerEl.textContent = time;
        answerEl.textContent = "Incorrect";
    }
    else {
        answerEl.textContent = "Correct!"
    }

    answerEl.setAttribute("class", "answers");
    setTimeout(function() {
    answerEl.setAttribute("class", "hidden");
    }, 1000);

    currentQuestionIndex++;

    if (currentQuestionIndex === myQuestions.length) {
        endQuiz();
    }
    else {
        showQuestions();
    }
}

function endQuiz() {
    clearInterval(timer);
    let endpage = document.getElementById("finished");
    endpage.removeAttribute("class");
    let score  = document.getElementById("final-score");
    score.textContent = time;
    questionsEl.setAttribute("class", "hidden");
}

function saveScore() {
    let name = nameEl.value;

    if (name !== "") {
        let scores = JSON.parse(window.localStorage.getItem("scores")) || [];

        let newScore =  {
            score: time,
            name: name
        };

        scores.push(newScore);
        window.localStorage.setItem("scores", JSON.stringify(scores));

        window.location.href = "highscores.html";
    }
}

function clockCountDown() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}

// WHEN I click the start button
startBtn.addEventListener("click", startQuiz);

submitBtn.addEventListener("click", saveScore);
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score









