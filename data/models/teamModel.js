const db = require('../dbConfig');

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
};

function insert(team) {
    return db('teams').insert(team)
    .then(([id]) => id)
    .catch(e => { throw e });
}

function getAll() {
    return db('teams');
}

function findById(id) {
    return db('teams').where('id', id)
    .then(([team]) => {
        if (team) return team;
        else throw new Error('Invalid: id does not exist');
    })
    .catch(e => { throw e });
}

function update(id, changes) {
    return db('teams').where('id', id).update(changes)
      .then(count => {
          if (count) return count;
          else throw new Error('Invalid: id does not exist');
      })
      .catch(e => { throw e });
}

function remove(id) {
    return db('teams').where('id', id).del()
    .then(count => {
        if (count) return count;
        else throw new Error('Invalid: id does not exist');
    })
    .catch(e => { throw e });
}