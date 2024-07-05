const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const questions = [
  {
    question: "What CI stands for?",
    options: ["Continuous Improvement", "Centralized Installation", "Code Interaction", "Continuous Integration"],
    correctAnswer: 3
  },
  {
    question: "How to increase the context in ML applications?",
    options: ["Increase the size of a dictionary", "Add more layers to the neural network", "Decrease the batch size", "Increase the size of a dictionary"],
    correctAnswer: 0
  },
  {
    question: "What are the 3 steps of CI?",
    options: ["Commit, Build, Test", "Plan, Execute, Monitor", "Develop, Test, Release", "Commit, Build, Test"],
    correctAnswer: 0
  },
  {
    question: "What is a .yaml file good for?",
    options: ["Executing binaries", "Writing long-form text", "Configuration and data serialization", "Storing images"],
    correctAnswer: 2
  },
  {
    question: "How often should you commit?",
    options: ["Once a week", "Frequently, after small changes", "Only at the end of the project", "Frequently, after small changes"],
    correctAnswer: 1
  },
  {
    question: "What is a pre-commit?",
    options: ["A hook that runs checks before a commit is finalized", "A scheduled commit for future", "A commit that is made in the past", "A hook that runs checks before a commit is finalized"],
    correctAnswer: 0
  },
  {
    question: "Pick an example of a name of a test:",
    options: ["build_final_project", "delete_all_data", "execute_main_program", "test_login_function"],
    correctAnswer: 3
  },
  {
    question: "What is GitHub Actions?",
    options: ["A CI/CD service that automates workflows", "A feature for social interactions on GitHub", "A method to manage Git repositories", "A CI/CD service that automates workflows"],
    correctAnswer: 0
  },
  {
    question: "Why can't a single-layer perceptron solve the XOR problem?",
    options: ["Because it needs to transform into an Autobot first", "Because it requires quantum computing", "Because the XOR problem is not linearly separable",  "Because the XOR problem is not linearly separable"],
    correctAnswer: 2
  },
  {
    question: "What is the difference between a container and an image?",
    options: ["An image is a static snapshot of software, while a container is a running instance of an image.", "A container is a type of virtual machine, while an image is not.", "An image can be modified at runtime, while a container cannot.", "An image is a static snapshot of software, while a container is a running instance of an image."],
    correctAnswer: 0
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

module.exports = app;