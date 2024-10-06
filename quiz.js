// quiz.js

// Quiz Data with Extended Explanations
const quizData = {
    level1: [
        {
            question: "What does PACE stand for?",
            options: ["Polar Active Climate Explorer", "Plankton, Aerosol, Cloud, ocean Ecosystem", "Planetary Aerosol Carbon Exploration", "Precipitation Aerosol and Cloud Evolution"],
            correct: 1,
            info: "1. PACE stands for Plankton, Aerosol, Cloud, ocean Ecosystem. 2. It is an advanced Earth-observing satellite mission designed to monitor the health of our oceans and atmosphere. 3. By analyzing these components, PACE helps scientists understand how climate change impacts ecosystems."
        },
        {
            question: "What is the primary goal of the PACE mission?",
            options: ["To study changes in the atmosphere", "To understand ocean ecosystems", "To monitor Earth's carbon cycle", "To observe forest growth patterns"],
            correct: 1,
            info: "1. The main goal of PACE is to understand ocean ecosystems and how they interact with Earth's climate. 2. PACE will monitor the color of the ocean, which tells scientists about the presence of tiny organisms like phytoplankton. 3. Studying these ecosystems helps researchers predict climate changes and their effects on marine life."
        },
        {
            question: "Which agency developed the PACE satellite?",
            options: ["NASA", "ESA", "ISRO", "JAXA"],
            correct: 0,
            info: "1. NASA, the U.S. space agency, developed the PACE satellite. 2. NASA focuses on exploring space and Earth systems, and PACE is part of its mission to study our planet. 3. PACE will gather vital data on ocean and atmospheric conditions, which will help scientists worldwide."
        },
        {
            question: "When is the PACE satellite scheduled for launch?",
            options: ["2022", "2023", "2024", "2025"],
            correct: 2,
            info: "1. PACE is scheduled to launch in 2024. 2. The satellite will be placed in Earth's orbit to collect data for at least 5 years. 3. This launch is a significant step in improving our understanding of how oceans and the atmosphere affect global climate."
        },
        {
            question: "What type of data will PACE collect?",
            options: ["Atmospheric CO2 levels", "Ocean color and plankton levels", "Surface temperature", "Ice sheet movements"],
            correct: 1,
            info: "1. PACE will collect data on the color of oceans, which indicates the health of marine ecosystems. 2. It will also study the amount of phytoplankton in the water, which is essential for the ocean's food chain. 3. Additionally, PACE will observe aerosols, small particles in the air that affect climate and weather."
        },
        {
            question: "PACE will monitor ocean color to understand what?",
            options: ["Air pollution", "Cloud formations", "Marine ecosystems", "Global temperature"],
            correct: 2,
            info: "1. Ocean color gives scientists clues about the health of marine ecosystems, especially the presence of plankton. 2. Phytoplankton absorb carbon dioxide and play a crucial role in the Earth's carbon cycle. 3. By studying these organisms, scientists can better understand how the ocean supports life and regulates climate."
        },
    ],
    level2: [
        {
            question: "What is the altitude of PACE's orbit around Earth?",
            options: ["500 km", "700 km", "800 km", "1000 km"],
            correct: 1,
            info: "1. PACE will orbit Earth at about 700 kilometers (km) above the surface. 2. At this altitude, it will have a clear view of Earth's atmosphere and oceans. 3. This orbit allows PACE to collect high-resolution data over vast areas."
        },
        {
            question: "Which instrument will be used to measure ocean color from the PACE satellite?",
            options: ["MODIS", "OCI", "VIIRS", "CALIPSO"],
            correct: 1,
            info: "1. PACE's Ocean Color Instrument (OCI) will measure ocean color. 2. This instrument is specifically designed to detect changes in the water, including levels of phytoplankton. 3. OCI data helps scientists monitor the health of the ocean and its role in carbon absorption."
        },
        {
            question: "What are aerosols, which PACE will study in detail?",
            options: ["Clouds", "Tiny particles in the air", "Water vapor", "Dust storms"],
            correct: 1,
            info: "1. Aerosols are tiny particles suspended in the atmosphere, like dust or smoke. 2. They come from natural sources (volcanoes) and human activity (burning fossil fuels). 3. Aerosols can influence climate by reflecting or absorbing sunlight, affecting Earth's temperature."
        },
        {
            question: "How long is the mission duration planned for the PACE satellite?",
            options: ["5 years", "3 years", "10 years", "7 years"],
            correct: 0,
            info: "1. The PACE satellite is expected to operate for at least 5 years. 2. However, like many space missions, it may continue to collect data beyond its planned duration. 3. This long-term observation will help scientists track climate changes over time."
        },
        {
            question: "Which regions will PACE's observations cover?",
            options: ["Polar regions only", "Global", "Oceans only", "Atmosphere only"],
            correct: 1,
            info: "1. PACE will provide global coverage, observing the Earth's oceans and atmosphere. 2. This global view is important for understanding how different regions are affected by climate change. 3. PACE's observations will benefit scientists and policymakers worldwide."
        },
        {
            question: "What role do phytoplankton play in the carbon cycle that PACE will study?",
            options: ["Increase atmospheric CO2", "Absorb CO2", "Release methane", "Create oxygen only"],
            correct: 1,
            info: "1. Phytoplankton are tiny plants that live in the ocean and absorb carbon dioxide (CO2) through photosynthesis. 2. This process helps reduce the amount of CO2 in the atmosphere, slowing climate change. 3. Phytoplankton are also a critical part of the marine food web, supporting fish and other sea life."
        },
    ],
};

let currentLevel = 1;
let currentQuestionIndex = 0;
let timer;
let timeLeft = 30;
const infoModal = document.getElementById('info-modal');
const infoContent = document.getElementById('info');
const closeInfoButton = document.getElementById('close-info');

// Start the quiz
function startQuiz() {
    displayQuestion();
    startTimer();
}

// Display the question and options
function displayQuestion() {
    const currentLevelData = quizData[`level${currentLevel}`];
    const currentQuestion = currentLevelData[currentQuestionIndex];

    document.getElementById('question').textContent = currentQuestion.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

// Start the timer
function startTimer() {
    timeLeft = 30;
    document.getElementById('timer').textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showInfo(false);
        }
    }, 1000);
}

// Check the answer
function checkAnswer(selectedOption) {
    clearInterval(timer); // Stop timer when answer is selected

    const currentLevelData = quizData[`level${currentLevel}`];
    const currentQuestion = currentLevelData[currentQuestionIndex];

    if (selectedOption === currentQuestion.correct) {
        showInfo(true);
    } else {
        showInfo(false);
    }
}

// Show the info and explanation in a modal
function showInfo(isCorrect) {
    const currentLevelData = quizData[`level${currentLevel}`];
    const currentQuestion = currentLevelData[currentQuestionIndex];

    if (isCorrect) {
        infoContent.textContent = "Correct! " + currentQuestion.info;
    } else {
        infoContent.textContent = "Incorrect! " + currentQuestion.info;
    }

    // Show modal
    infoModal.style.display = 'flex';
}

// Close the info modal and proceed to the next question
closeInfoButton.onclick = function () {
    infoModal.style.display = 'none';
    nextQuestion();
};

function nextQuestion() {
    currentQuestionIndex++;

    const currentLevelData = quizData[`level${currentLevel}`];

    if (currentQuestionIndex >= currentLevelData.length) {
        moveToNextLevel();
    } else {
        displayQuestion();
        startTimer();
    }
}

// Move to the next level
function moveToNextLevel() {
    currentLevel++;

    if (quizData[`level${currentLevel}`]) {
        currentQuestionIndex = 0;
        document.getElementById('level-number').textContent = currentLevel;
        displayQuestion();
        startTimer();
    } else {
        endGame();
    }
}

// End the game
function endGame() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('game-completed').style.display = 'block';
}

// Restart the game
function restartGame() {
    currentLevel = 1;
    currentQuestionIndex = 0;
    document.getElementById('game-completed').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('level-number').textContent = currentLevel;
    startQuiz();
}

// Initialize the quiz when the page loads
window.onload = startQuiz;



