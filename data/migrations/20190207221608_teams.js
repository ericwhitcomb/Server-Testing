exports.up = function(knex, Promise) {
    return knex.schema.createTable('teams', function(teams) {
      teams.increments();
      teams.text('name').notNullable().unique();
      teams.text('location').notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('teams');
  };
  
