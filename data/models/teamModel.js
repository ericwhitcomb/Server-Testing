const db = require('../dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
};

async function insert(team) {
    return db('teams').insert(team);
}

async function update(id, team) {
    return null;
}

function remove(id) {
    return null;
}

function getAll() {
    return db('teams');
}

function findById(id) {
    return null;
}