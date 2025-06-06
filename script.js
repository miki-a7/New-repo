// Quiz questions
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        correctAnswer: 1
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    }
];

// DOM Elements
const questionElement = document.querySelector('.question');
const optionsContainer = document.querySelector('.options-container');
const questionCountElement = document.querySelector('.question-count');
const scoreElement = document.querySelector('.score');
const progressBar = document.querySelector('.progress');
const nextButton = document.querySelector('.next-btn');

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let quizCompleted = false;

// Initialize quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizCompleted = false;
    showQuestion();
}

// Display current question
function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
    
    updateProgress();
    nextButton.disabled = true;
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Disable all options after selection
    options.forEach(option => {
        option.disabled = true;
    });
    
    // Check if answer is correct
    if (selectedIndex === currentQuestion.correctAnswer) {
        options[selectedIndex].classList.add('correct');
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[currentQuestion.correctAnswer].classList.add('correct');
    }
    
    nextButton.disabled = false;
}

// Update progress bar and question count
function updateProgress() {
    const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    questionCountElement.textContent = `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`;
    scoreElement.textContent = `Score: ${score}`;
}

// Move to next question or show results
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Show final results
function showResults() {
    quizCompleted = true;
    questionElement.textContent = `Quiz Completed! Your score: ${score}/${quizQuestions.length}`;
    optionsContainer.innerHTML = '';
    nextButton.textContent = 'Restart Quiz';
    nextButton.addEventListener('click', startQuiz);
}

// Event listeners
nextButton.addEventListener('click', nextQuestion);

// Start the quiz
startQuiz();
