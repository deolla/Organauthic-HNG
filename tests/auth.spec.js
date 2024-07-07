import request from 'supertest';
import app from '../src/server'; // Adjust the path as per your project structure

describe('Auth Tests', () => {
  it('should register user successfully with default organisation', async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      phone: '1234567890',
    };

    const res = await request(app)
      .post('/auth/register')
      .send(userData);

    // Expectations
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toBe('Registration successful');
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.user).toBeDefined();
    expect(res.body.data.user.firstName).toBe('John');
    expect(res.body.data.user.lastName).toBe('Doe');
    expect(res.body.data.user.email).toBe('deosun@gmail.com');
    expect(res.body.data.user.phone).toBe('1234567890');
    // Check default organisation name
    expect(res.body.data.organisation).toBeDefined();
    expect(res.body.data.user.organization.name).toBe("John's Organisation");
  });
});

it('should log in user successfully', async () => {
  const credentials = {
    email: 'johndoe@example.com',
    password: 'password123',
  };

  const res = await request(app)
    .post('/auth/login')
    .send(credentials);

  // Expectations
  expect(res.status).toBe(200);
  expect(res.body.status).toBe('success');
  expect(res.body.message).toBe('Login successful');
  expect(res.body.data.accessToken).toBeDefined();
  expect(res.body.data.user).toBeDefined();
  expect(res.body.data.user.firstName).toBe('John');
  expect(res.body.data.user.lastName).toBe('Doe');
  expect(res.body.data.user.email).toBe('johndoe@example.com');
  expect(res.body.data.user.phone).toBe('1234567890');
});
it('should fail if firstName is missing', async () => {
  const userData = {
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'password123',
    phone: '1234567890',
  };

  const res = await request(app)
    .post('/auth/register')
    .send(userData);

  expect(res.status).toBe(400);
  // Check error message for missing field
  expect(res.body.message).toContain('All fields are required for registration');
});

// Similarly, add tests for lastName, email, and password missing cases
it('should fail if email is already in use', async () => {
  const userData = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'johndoe@example.com', // Existing email used
    password: 'password123',
    phone: '1234567890',
  };

  const res = await request(app)
    .post('/auth/register')
    .send(userData);

  expect(res.status).toBe(409);
  expect(res.body.status).toBe('Bad request');
  expect(res.body.message).toBe('Email already in use');
});


