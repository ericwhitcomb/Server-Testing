const request = require('supertest');

const server = require('./server');
const teamModel = require('../data/models/teamModel');
const db = require('../data/dbConfig');

describe('the team api', () => {

    describe('get /', () => {

        test('responds with 200', async () => {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            const response = await request(server).get('/');
            expect(response.type).toMatch(/json/i);
        });

        test('sends correct response object', async () => {
            const response = await request(server).get('/');
            expect(response.body).toEqual({api: 'up'});
        });

    });

    describe('post /api/teams', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('responds with 201', async () => {
            const body = { name: "Broncos", location: "Denver" };
            const response = await request(server).post('/api/teams').send(body);
            expect(response.status).toBe(201);
        });

        test('responds with json', async () => {
            const body = { name: "Broncos", location: "Denver" };
            const response = await request(server).post('/api/teams').send(body);
            expect(response.type).toMatch(/json/i);
        });

        test('responds with id of new team', async () => {
            const body = { name: "Broncos", location: "Denver" };
            const response = await request(server).post('/api/teams').send(body);
            expect(response.body).toEqual({id: 1});
        });

        test('responds with 400', async () => {
            const body = {};
            const response = await request(server).post('/api/teams').send(body);
            expect(response.status).toBe(400);
        });

    });

    describe('get /api/teams', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('responds with 200', async () => {
            await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            const response = await request(server).get('/api/teams');
            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            const response = await request(server).post('/api/teams');
            expect(response.type).toMatch(/json/i);
        });

        test('responds with array of teams', async () => {
            await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            await teamModel.insert({ name: 'Raiders', location: 'Oakland' });
            await teamModel.insert({ name: 'Chiefs', location: 'Kansas City' });
            const response = await request(server).get('/api/teams');
            expect(response.body).toEqual([
                { id: 1, name: 'Broncos', location: 'Denver' },
                { id: 2, name: 'Raiders', location: 'Oakland' },
                { id: 3, name: 'Chiefs', location: 'Kansas City' }
            ]);
        });

        test('responds with empty array', async () => {
            const response = await request(server).get('/api/teams');
            expect(response.body).toEqual([]);
        });
    });

    describe('get /api/teams/:id', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('responds with 200', async () => {
            const id = await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            const response = await request(server).get(`/api/teams/${id}`);
            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            const id = await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            const response = await request(server).get(`/api/teams/${id}`);
            expect(response.type).toMatch(/json/i);
        });

        test('responds with team object', async () => {
            const id = await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            const response = await request(server).get(`/api/teams/${id}`);
            expect(response.body).toEqual({ id: 1, name: 'Broncos', location: 'Denver' });
        });

        test('responds with 404', async () => {
            const id = 1;
            const response = await request(server).get(`/api/teams/${id}`);
            expect(response.status).toBe(404);
        });

    });

    describe('update /api/teams/:id', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('responds with 200', async () => {
            const id = await teamModel.insert({ name: 'Broncs', location: 'Denvr' });
            const body = { name: "Broncos", location: "Denver" };
            const response = await request(server).put(`/api/teams/${id}`).send(body);
            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            const id = await teamModel.insert({ name: 'Broncs', location: 'Denver' });
            const body = { name: "Broncos", location: "Denver" };
            const response = await request(server).get(`/api/teams/${id}`).send(body);
            expect(response.type).toMatch(/json/i);
        });

        test('responds with count of 1', async () => {
            const id = await teamModel.insert({ name: 'Broncs', location: 'Denvr' });
            const body = { name: "Broncos", location: "Denver" };
            const response = await request(server).put(`/api/teams/${id}`).send(body);
            expect(response.body).toEqual({ count: 1 });
        });

        test('responds with 404', async () => {
            const id = 1;
            const body = { name: "Broncos", location: "Denver" };
            const response = await request(server).get(`/api/teams/${id}`).send(body);
            expect(response.status).toBe(404);
        });

    });

    describe('delete /api/teams/:id', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('responds with 200', async () => {
            const id = await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            const response = await request(server).delete(`/api/teams/${id}`);
            expect(response.status).toBe(200);
        });

        test('responds with json', async () => {
            const id = await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            const response = await request(server).delete(`/api/teams/${id}`);
            expect(response.type).toMatch(/json/i);
        });

        test('responds with count of 1', async () => {
            const id = await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            const response = await request(server).delete(`/api/teams/${id}`);
            expect(response.body).toEqual({ count: 1 });
        });

        test('responds with 404', async () => {
            const id = 1;
            const response = await request(server).delete(`/api/teams/${id}`);
            expect(response.status).toBe(404);
        });

    });

});