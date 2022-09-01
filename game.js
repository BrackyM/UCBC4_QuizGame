const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is question 1?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 1,
  },
  {
    question: "What is question 2?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 2,
  },
  {
    question: "What is question 3?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 3,
  },
  {
    question: "What is question 4?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 4,
  },
  {
    question: "What is question 5?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "5",
    answer: 5,
  },
  {
    question: "What is question 6?",
    choice1: "6",
    choice2: "6",
    choice3: "6",
    choice4: "6",
    answer: 6,
  },
];

const SCORE_POINTS = 10;
const LOSE_POINTS = -10;
const MAX_QUESTIONS = questions.length;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
    console.log(questionCounter, availableQuestions.length)
    if (availableQuestions.length === -1 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
    
        return window.location.assign("./end.html");
      }

      questionCounter++;

  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS} `;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];

   var questionTitle = document.getElementById("question-title");

   questionTitle.textContent = currentQuestion.question;

  questions.innerText = currentQuestion.question

   choices.forEach(choice => {
       const number = choice.dataset['number']
      choice.innerText = currentQuestion['choice' + number]
   })

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
    console.log(selectedAnswer, currentQuestion.answer,selectedChoice.innerText)
    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    } else {
      incrementScore(LOSE_POINTS);
      count = count - 10
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
var count = 10;
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
