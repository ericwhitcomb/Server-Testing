const teamModel = require('./teamModel');
const db = require('../data/dbConfig');

describe('the team model', () => {

    describe('insert function', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('returns id of inserted team', async () => {
            const id = await teamModel.insert({name: 'Broncos', location: 'Denver'});  
            expect(id).toBe(1);
        });

        test('throws error on missing name', async () => {
            expect(() => {
                await teamModel.insert({location: 'Denver'});
            }).toThrow();
        });

        test('throws error on missing location', async () => {
            expect(() => {
                await teamModel.insert({name: 'Broncos'});
            }).toThrow();
        });

        test('throws error on duplicate name', async () => {
            expect(() => {
                await teamModel.insert({name: 'Broncos', location: 'Denver'});
                await teamModel.insert({name: 'Broncos', location: 'Denver'});
            }).toThrow();
        });

    });

    describe('get all function', () => {

        afterAll(async () => {
            await db('teams').truncate();
        });

        test('returns array of all teams', async () => {
            await db('teams').truncate();
            await teamModel.insert({name: 'Broncos', location: 'Denver'});
            await teamModel.insert({name: 'Raiders', location: 'Oakland'});
            await teamModel.insert({name: 'Chiefs', location: 'Kansas City'});

            const teams = await teamModel.getAll();
            expect(teams).toEqual([
                {id: 1, name: 'Broncos', location: 'Denver'},
                {id: 2, name: 'Raiders', location: 'Oakland'},
                {id: 3, name: 'Chiefs', location: 'Kansas City'}
            ]);
        });

        test('returns empty array when table empty', async () => {
            const teams = await teamModel.getAll();  
            expect(teams).toEqual([]);
        });

    });

    describe('find by id function', () => {

        afterAll(async () => {
            await db('teams').truncate();
        });

        test('returns team object by id', async () => {
            await db('teams').truncate();
            const id = await teamModel.insert({name: 'Broncos', location: 'Denver'});
            const team = await teamModel.findById(id);
            expect(team).toEqual({id: 1, name: 'Broncos', location: 'Denver'});
        });

        test('throws error on invalid id', async () => {
            expect(() => {
                await teamModel.findById(1);
            }).toThrow();
        });

    });

    describe('update function', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('updates the name of a team', async () => {
            await db('teams').truncate();
            let id = await teamModel.insert({name: 'Broncs', location: 'Denver'});
            id = await teamModel.update(id, {name: 'Broncos'});
            const team = await teamModel.findById(id);
            expect(team.id).toBe(1);
            expect(team.name).toBe('Broncos');
        });

        test('updates the location of a team', async () => {
            await db('teams').truncate();
            let id = await teamModel.insert({name: 'Broncos', location: 'Denvr'});
            id = await teamModel.update(id, {location: 'Denver'});
            const team = await teamModel.findById(id);
            expect(team.id).toBe(1);
            expect(team.location).toBe('Denver');
        });

        test('throws error on empty object', async () => {
            await db('teams').truncate();
            let id = await teamModel.insert({name: 'Broncos', location: 'Denver'});
            expect(() => {
                await teamModel.update(up, {});
            }).toThrow();
        });

        test('throws error on invalid id', async () => {
            expect(() => {
                await teamModel.update(1, {name: 'Broncos', location: 'Denver'});
            }).toThrow();
        });

    });

    describe('delete function', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('returns count of 1 on delete', async () => {
            await db('teams').truncate();
            let id = await teamModel.insert({name: 'Broncos', location: 'Denver'});
            const count = await teamModel.delete(id);
            expect(count).toBe(1);
        });

        test('throws error on invalid id', async () => {
            expect(() => {
                await teamModel.delete(1);
            }).toThrow();
        });

    });

});