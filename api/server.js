const express = require('express');

const teamModel = require('../data/models/teamModel');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.get('/api/teams', async (req, res) => {
    
});

server.get('/api/teams/:id', async (req, res) => {
    
});

server.post('/api/teams', async (req, res) => {
    
});

server.put('/api/teams/:id', async (req, res) => {
    
});

server.put('/api/teams/:id', async (req, res) => {
    
});

module.exports = server;