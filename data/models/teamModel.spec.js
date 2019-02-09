const teamModel = require('./teamModel');
const db = require('../dbConfig');

describe('the team model', () => {

    describe('insert function', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('returns id of inserted team', async () => {
            const id = await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            expect(id).toBe(1);
        });

        test('throws error on missing name', async () => {
            const message = "insert into `teams` (`location`) values ('Denver') - SQLITE_CONSTRAINT: NOT NULL constraint failed: teams.name";
            try {
                await teamModel.insert({ location: 'Denver' });
            } catch (e) {
                expect(e.message).toEqual(message);
            }
        });

        test('throws error on missing location', async () => {
            const message = "insert into `teams` (`name`) values ('Broncos') - SQLITE_CONSTRAINT: NOT NULL constraint failed: teams.location";
            try {
                await teamModel.insert({ name: 'Broncos' });
            } catch (e) {
                expect(e.message).toBe(message);
            }
        });

        test('throws error on duplicate name', async () => {
            const message = "insert into `teams` (`location`, `name`) values ('Denver', 'Broncos') - SQLITE_CONSTRAINT: UNIQUE constraint failed: teams.name";
            try {
                await teamModel.insert({ name: 'Broncos', location: 'Denver' });
                await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            } catch (e) {
                expect(e.message).toBe(message);
            }
        });

    });

    describe('get all function', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('returns array of all teams', async () => {
            await db('teams').truncate();
            await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            await teamModel.insert({ name: 'Raiders', location: 'Oakland' });
            await teamModel.insert({ name: 'Chiefs', location: 'Kansas City' });

            const teams = await teamModel.getAll();
            expect(teams).toEqual([
                { id: 1, name: 'Broncos', location: 'Denver' },
                { id: 2, name: 'Raiders', location: 'Oakland' },
                { id: 3, name: 'Chiefs', location: 'Kansas City' }
            ]);
        });

        test('returns empty array when table empty', async () => {
            const teams = await teamModel.getAll();
            expect(teams).toEqual([]);
        });

    });

    describe('find by id function', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('returns team object by id', async () => {
            await db('teams').truncate();
            const id = await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            const team = await teamModel.findById(id);
            expect(team).toEqual({ id: 1, name: 'Broncos', location: 'Denver' });
        });

        test('throws error on invalid id', async () => {
            const message = "Invalid: id does not exist";
            try {
                await teamModel.findById(1);
            } catch (e) {
                expect(e.message).toBe(message);
            }
        });

    });

    describe('update function', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('returns count of 1 on update of name', async () => {
            await db('teams').truncate();
            const id = await teamModel.insert({ name: 'Broncs', location: 'Denver' });
            const count = await teamModel.update(id, { name: 'Broncos' });
            expect(count).toBe(1);
        });

        test('returns count of 1 on update of location', async () => {
            await db('teams').truncate();
            const id = await teamModel.insert({ name: 'Broncos', location: 'Denvr' });
            const count = await teamModel.update(id, { location: 'Denver' });
            expect(count).toBe(1);
        });

        test('changes name correctly on update', async () => {
            await db('teams').truncate();
            const id = await teamModel.insert({ name: 'Broncs', location: 'Denver' });
            await teamModel.update(id, { name: 'Broncos' });
            const team = await teamModel.findById(id);
            expect(team.name).toBe('Broncos');
        });

        test('changes location correctly on update', async () => {
            await db('teams').truncate();
            const id = await teamModel.insert({ name: 'Broncos', location: 'Denvr' });
            await teamModel.update(id, { location: 'Denver' });
            const team = await teamModel.findById(id);
            expect(team.location).toBe('Denver');
        });

        test('throws error on empty object', async () => {
            await db('teams').truncate();
            let id = await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            const message = "Empty .update() call detected! Update data does not contain any values to update. This will result in a faulty query.";
            try {
                await teamModel.update(id, {});
            } catch (e) {
                expect(e.message).toBe(message);
            }
        });

        test('throws error on invalid id', async () => {
            const message = "Invalid: id does not exist";
            try {
                await teamModel.update(1, { name: 'Broncos', location: 'Denver' });
            } catch (e) {
                expect(e.message).toBe(message);
            }
        });

    });

    describe('remove function', () => {

        afterEach(async () => {
            await db('teams').truncate();
        });

        test('returns count of 1 on delete', async () => {
            await db('teams').truncate();
            let id = await teamModel.insert({ name: 'Broncos', location: 'Denver' });
            const count = await teamModel.remove(id);
            expect(count).toBe(1);
        });

        test('throws error on invalid id', async () => {
            const message = "Invalid: id does not exist";
            try {
                await teamModel.remove(1);
            } catch (e) {
                expect(e.message).toBe(message);
            }
        });

    });

});