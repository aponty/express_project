const pgp = require('pg-promise')();

const db = pgp(process.env.DATABASE_URL || 'postgres://anson@localhost:5432/trellis');

module.exports = db;
