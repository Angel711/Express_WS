const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: '0.0.0.0',
    user: 'root',
    password: '',
    database: 'pokemon'
});


pool.query = util.promisify(pool.query);
module.exports = pool;