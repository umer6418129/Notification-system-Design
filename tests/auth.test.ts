// tests/auth.test.ts
import request from 'supertest';
import app from '../src/index'; // Adjust the path as needed

describe('POST /auth-login', () => {
    // it('should return status: 1 for valid login credentials', async () => {
    //     const response = await request(app)
    //         .post('/auth-login')
    //         .send({
    //             email: 'test@example.com', // Use a valid email in your database
    //             password: 'testpassword',   // Use the correct password for this user
    //         });

    //     console.log('Response for valid credentials:', response.body); // Debug log
    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual({ status: 0 });
    // });

    it('should return status: 0 for invalid login credentials', async () => {
        const response = await request(app)
            .post('/auth-login')
            .send({
                email: 'wrong@example.com',
                password: 'wrongpassword',
            });

        expect(response.status).toBe(200); // Check the HTTP status code
        expect(response.body.status).toBe(0); // Focus only on the status property
    });
});
