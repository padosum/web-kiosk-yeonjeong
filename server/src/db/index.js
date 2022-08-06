import * as dotenv from 'dotenv';

const mysql = require('mysql2/promise');

dotenv.config();

let _dbConn = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
});

export { _dbConn };
