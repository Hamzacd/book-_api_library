const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {
  it('should get all books', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should get a book by ID', async () => {
    const response = await request(app).get('/books/5');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should add a new book', async () => {
    const newBook = {
      title: 'Test Book',
      author: 'Test Author',
      isbn: '1234567890',
      publication_year: 2022,
    };
    const response = await request(app)
      .post('/books')
      .send(newBook);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newBook);
  });

  it('should update an existing book', async () => {
    const updatedBook = {
      title: 'Updated Book',
      author: 'Updated Author',
      isbn: '0987654321',
      publication_year: 2023,
    };
    const response = await request(app)
      .put('/books/5')
      .send(updatedBook);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Book updated successfully' });
  });

  it('should delete a book', async () => {
    const response = await request(app).delete('/books/6');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Book deleted successfully' });
  });
});
