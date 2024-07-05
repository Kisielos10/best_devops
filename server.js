const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1
  },
  {
    question: "In which year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    correctAnswer: 2
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    correctAnswer: 1
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    correctAnswer: 1
  },
  {
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "South Africa", "Australia", "Brazil"],
    correctAnswer: 2
  },
  {
    question: "What is the largest organ in the human body?",
    options: ["Heart", "Liver", "Brain", "Skin"],
    correctAnswer: 3
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctAnswer: 2
  }
];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/questions', (req, res) => {
  res.json(questions.map(q => ({ question: q.question, options: q.options })));
});

app.post('/api/submit', (req, res) => {
  const userAnswers = req.body;
  let score = 0;
  const results = questions.map((q, index) => {
    const isCorrect = q.correctAnswer === userAnswers[index];
    if (isCorrect) score++;
    return { 
      question: q.question, 
      userAnswer: q.options[userAnswers[index]],
      correctAnswer: q.options[q.correctAnswer],
      isCorrect 
    };
  });
  res.json({ score, total: questions.length, results });
});

app.listen(port, () => {
  console.log(`Quiz app listening at http://localhost:${port}`);
});