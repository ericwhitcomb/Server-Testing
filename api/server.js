const express = require('express');

const teamModel = require('../data/models/teamModel');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up' });
});

server.post('/api/teams', async (req, res) => {
    const team = req.body;
    if (team.name && team.location) {
      const id = await teamModel.insert(team);
      res.status(201).json({id});
    } else {
      res.status(400).json({error: 'Missing name or location'});
    }
});

server.get('/api/teams', async (req, res) => {
    const rows = await teamModel.getAll();
    res.status(200).json(rows);
});

server.get('/api/teams/:id', async (req, res) => {
    try {
        const team = await teamModel.findById(req.params.id);
        res.status(200).json(team);
    } catch (e) {
        res.status(404).json({error: e.message});
    }
});

server.put('/api/teams/:id', async (req, res) => {
    try {
        const count = await teamModel.update(req.params.id, req.body);
        res.status(200).json({ count });
    } catch (e) {
        res.status(404).json({error: e.message});
    }
});

server.delete('/api/teams/:id', async (req, res) => {
    try {
        const count = await teamModel.remove(req.params.id);
        res.status(200).json({ count });
    } catch (e) {
        res.status(404).json({error: e.message});
    }
});

module.exports = server;