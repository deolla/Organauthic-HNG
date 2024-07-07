// db.js
import knex from 'knex';
import knexfile from './knexfile.cjs';

const environment =  'test' // process.env.NODE_ENV === 'test' ? 'test' : 'development';
const config = knexfile[environment];

const db = knex(config);

export default db;
