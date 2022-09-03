const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");

// Defining variable amounts

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Array of Questions with their choices and answers

let questions = [
  {
    question: "What is 5 + 5?",
    choice1: "10",
    choice2: "20",
    choice3: "15",
    choice4: "8",
    answer: 10,
  },
  {
    question: "What is the square root of 144?",
    choice1: "11",
    choice2: "10",
    choice3: "7",
    choice4: "12",
    answer: 12,
  },
  {
    question: "What is 91 + 84?",
    choice1: "175",
    choice2: "145",
    choice3: "165",
    choice4: "150",
    answer: 175,
  },
  {
    question: "What is 120 / 4?",
    choice1: "20",
    choice2: "30",
    choice3: "35",
    choice4: "25",
    answer: 30,
  },
  {
    question: "What is 9 * 8?",
    choice1: "64",
    choice2: "80",
    choice3: "74",
    choice4: "72",
    answer: 72,
  },
  {
    question: "What is 9 + 10?",
    choice1: "19",
    choice2: "21",
    choice3: "20",
    choice4: "100",
    answer: 19,
  },
];

// Variables for gaining and losing points
const SCORE_POINTS = 10;
const LOSE_POINTS = -10;
// Max questions correlating with amount of questions
const MAX_QUESTIONS = questions.length;

// Defining question counter and score at the beginning of the quiz
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

// arrow function that gets a randomized question from the array
getNewQuestion = () => {
  console.log(questionCounter, availableQuestions.length);
  if (availableQuestions.length === -1 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  questionCounter++;

  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS} `;

  // randomizing the question selection from the array
  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];

  var questionTitle = document.getElementById("question-title");

  questionTitle.textContent = currentQuestion.question;

  questions.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);
  acceptingAnswers = true;

  //console.log(questionCounter, availableQuestions.length)
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.innerText;
    console.log(
      selectedAnswer,
      currentQuestion.answer,
      selectedChoice.innerText
    );
    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    // Increment score based on correct or incorrect score
    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    } else {
      // score decreased by lose point amount (10) and decreases timer by 30 seconds
      incrementScore(LOSE_POINTS);
      count = count - 30;
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();

// Timer Code
var count = 180;
var counter = setInterval(timer, 1000);

function timer() {
  count = count - 1;
  if (count == -1) {
    clearInterval(counter);
    return;
  }

  if (count === 0) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("./end.html");
  }

  function zeroReplace(n) {
    return (n < 10 ? "0" : "") + n;
  }

  var seconds = count % 60;
  var minutes = Math.floor(count / 60);
  minutes %= 5;

  document.getElementById("timer").innerHTML =
    zeroReplace(minutes) + ":" + zeroReplace(seconds);
}
