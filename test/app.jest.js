const request = require('supertest');
const app = require('../server'); // Assuming your Express app is exported from server.js

describe('Quiz App', () => {
  test('GET /api/questions should return all questions', async () => {
    const response = await request(app).get('/api/questions');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(10);
    expect(response.body[0]).toHaveProperty('question');
    expect(response.body[0]).toHaveProperty('options');
  });

  test('POST /api/submit should return correct score for all correct answers', async () => {
    const userAnswers = [2, 1, 1, 2, 1, 1, 2, 3, 1, 2];
    const response = await request(app)
      .post('/api/submit')
      .send(userAnswers);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('score', 10);
    expect(response.body).toHaveProperty('total', 10);
    expect(response.body.results).toBeInstanceOf(Array);
    response.body.results.forEach(result => {
      expect(result).toHaveProperty('isCorrect', true);
    });
  });

  test('POST /api/submit should return correct score for all incorrect answers', async () => {
    const userAnswers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const response = await request(app)
      .post('/api/submit')
      .send(userAnswers);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('score', 0);
    expect(response.body).toHaveProperty('total', 10);
    expect(response.body.results).toBeInstanceOf(Array);
    response.body.results.forEach(result => {
      expect(result).toHaveProperty('isCorrect', false);
    });
  });
});
