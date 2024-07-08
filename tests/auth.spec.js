import jwt from 'jsonwebtoken';
import { authenticate } from '../src/controllers/authController';
import { getOrganisations, getOrganisationById } from '../src/controllers/organisationsController.js';
import db from '../src/database/db.js';
import {v4 as uuidv4} from 'uuid';
import app from '../src/server.js';
import request from 'supertest';
import { generateToken, verifyToken } from '../src/middleware/auth.js'

//const request = supertest(app);

describe('User Routes', () => {
  let token;

  // Before each test, generate a token for authentication
  beforeEach(() => {
    const user = {
      userId: '4ddfda32-5b44-4f4e-b286-c6fc0ebbf2a9',
      email: 'jane.smith@example.com',
    };
    token = generateToken(user);
  });

  // Test fetching all users (GET /users)
  it('GET /users should return status 200 and users if authenticated', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`); // Set Authorization header with Bearer token

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.users).toBeDefined();
  });

  // Test fetching user by ID (GET /users/:id)
  it('GET /users/:id should return status 200 and user data if authenticated', async () => {
    const userId = 'user123'; // Replace with actual user ID

    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toBeDefined();
    expect(response.body.data.userId).toBe(userId);
  });

  // Test deleting user by ID (DELETE /user/:id)
  it('DELETE /user/:id should return status 403 if unauthorized', async () => {
    const userIdToDelete = 'user123'; // Replace with actual user ID that is not the authenticated user

    const response = await request(app)
      .delete(`/api/user/${userIdToDelete}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('You are not authorized to delete this user');
  });

  // Test updating user by ID (PUT /user/:id)
  it('PUT /user/:id should return status 403 if unauthorized', async () => {
    const userIdToUpdate = 'user123'; // Replace with actual user ID that is not the authenticated user

    const response = await request(app)
      .put(`/api/user/${userIdToUpdate}`)
      .send({ firstName: 'UpdatedFirstName' }) // Example update payload
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('You are not authorized to update this user');
  });
});

// describe('Token Generation', () => {
//   it('should generate a token with correct expiry time and user details', () => {
//     const user = { userId: 1, email: 'test@example.com' };
//     const token = jwt.sign(user, process.env.BATTLE_GROUND, { expiresIn: '1h' });

//     const decoded = jwt.verify(token, process.env.BATTLE_GROUND);
//     expect(decoded.userId).toEqual(user.userId);
//     expect(decoded.email).toEqual(user.email);
//     expect(decoded.exp).toBeDefined();
//   });
// });

// describe('Organisation Access Control', () => {
//   let token;
//   let userId;
//   let orgId;

//   beforeAll(async () => {
//     // Setup user and organization
//     userId = uuidv4();
//     orgId = uuidv4();
//     const user = {
//       userId,
//       email: 'test@example.com',
//       password: 'password123',
//       firstName: 'Test',
//       lastName: 'User',
//       phone: '08012345678'
//     };
//     token = jwt.sign({ userId: user.userId }, process.env.BATTLE_GROUND, { expiresIn: '1h' });

//     await db('users').insert(user);
//     await db('organisations').insert({ orgId, name: 'Test Org', description: 'Test Description' });
//     await db('users_organisation').insert({ userId, orgId });
//   });

//   afterAll(async () => {
//     // Clean up database
//     await db('users_organisation').del();
//     await db('organisations').del();
//     await db('users').del();
//   });

//   it('should allow user to see their organisations', async () => {
//     const req = {
//       headers: { authorization: `Bearer ${token}` },
//       user: { userId },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await getOrganisations(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
//       status: 'success',
//       data: expect.objectContaining({
//         organisations: expect.arrayContaining([expect.objectContaining({ orgId })]),
//       }),
//     }));
//   });

//   it('should not allow user to see organisations they do not have access to', async () => {
//     const req = {
//       headers: { authorization: `Bearer ${token}` },
//       user: { userId },
//       params: { orgId: uuidv4() }, // Generate a new UUID which the user doesn't have access to
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await getOrganisationById(req, res);
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
//       status: 'error',
//       message: 'Organisation not found',
//     }));
//   });
// });

















// describe('User Management Endpoints', () => {
//   let testUserId;
//   let token; // Assuming you have a token for authorization in your tests

//   beforeAll(async () => {
//     // Insert a test user into the database
//     const newUser = {
//       firstName: 'spongebob',
//       lastName: 'squarepants',
//       email: 'spongebob@squarepants.com',
//       password: 'password0123',
//       phone: '1234567810',
//     };
//     const [user] = await db('users').insert(newUser).returning('userId');
//     testUserId = user.userId;
//   });

//   afterAll(async () => {
//     // Clean up: Delete the test user from the database
//     await db('users').where('userId', testUserId).del();
//   });

//   it('should fetch all users', async () => {
//     const res = await request.get('/api/users');
//     expect(res.status).toBe(200);
//     expect(res.body.status).toBe('success');
//     expect(res.body.message).toBe('Users fetched successfully');
//     expect(res.body.users).toHaveLength(1); // Assuming only one user is inserted in beforeAll
//   });

//   it('should fetch user info by id if authorized', async () => {
//     const res = await request
//       .get(`/api/users/${testUserId}`)
//       .set('Authorization', `Bearer ${token}`); // Provide a valid token for authorization
//     expect(res.status).toBe(200);
//     expect(res.body.status).toBe('success');
//     expect(res.body.message).toBe('User record retrieved successfully');
//     expect(res.body.data.userId).toBe(testUserId);
//   });

//   it('should return 404 if user id does not exist', async () => {
//     const res = await request
//       .get('/api/users/invalidUserId')
//       .set('Authorization', `Bearer ${token}`);
//     expect(res.status).toBe(404);
//     expect(res.body.status).toBe('error');
//     expect(res.body.message).toBe('User not found');
//   });

//   it('should delete user by id if authorized', async () => {
//     const res = await request
//       .delete(`/api/users/${testUserId}`)
//       .set('Authorization', `Bearer ${token}`);
//     expect(res.status).toBe(200);
//     expect(res.body.message).toBe('User deleted successfully');
//   });

//   it('should update user by id if authorized', async () => {
//     const updatedUser = {
//       firstName: 'Updated',
//       lastName: 'Name',
//       email: 'updated.email@example.com',
//     };
//     const res = await request
//       .put(`/api/users/${testUserId}`)
//       .send(updatedUser)
//       .set('Authorization', `Bearer ${token}`);
//     expect(res.status).toBe(200);
//     expect(res.body.firstName).toBe(updatedUser.firstName);
//     expect(res.body.lastName).toBe(updatedUser.lastName);
//     expect(res.body.email).toBe(updatedUser.email);
//   });
// });