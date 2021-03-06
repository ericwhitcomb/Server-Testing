module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/nfl.sqlite3',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      },
    },
    test: {
      client: 'sqlite3',
      connection: {
        filename: './data/test.sqlite3',
      },
      useNullAsDefault: true,
      migrations: {
        directory: './data/migrations',
      },
      seeds: {
        directory: './data/seeds',
      },
    },
  };