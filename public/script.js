document.addEventListener('DOMContentLoaded', () => {
    const quizContainer = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');
    const resultsContainer = document.getElementById('results');

    let questions = [];

    // Fetch questions from the server
    fetch('/api/questions')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestions();
        });

    function displayQuestions() {
        questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question';
            let optionsHTML = question.options.map((option, optionIndex) => `
                <label class="option">
                    <input type="radio" name="q${index}" value="${optionIndex}">
                    ${option}
                </label>
            `).join('');
            
            questionElement.innerHTML = `
                <p class="question-name">${index + 1}. ${question.question}</p>
                <div class="options">
                    ${optionsHTML}
                </div>
            `;
            quizContainer.appendChild(questionElement);
        });
    }

    submitButton.addEventListener('click', () => {
        const answers = questions.map((_, index) => {
            const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
            return selectedOption ? parseInt(selectedOption.value) : -1;
        });

        fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers),
        })
        .then(response => response.json())
        .then(data => {
            displayResults(data);
        });
    });

    function displayResults(data) {
        let resultsHTML = `<h2>Your Score: ${data.score} out of ${data.total}</h2>`;
        data.results.forEach((result, index) => {
            resultsHTML += `
                <p>
                    ${index + 1}. ${result.question}<br>
                    Your answer: ${result.userAnswer}<br>
                    Correct answer: ${result.correctAnswer}<br>
                    ${result.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                </p>
            `;
        });
        resultsContainer.innerHTML = resultsHTML;
    }
});