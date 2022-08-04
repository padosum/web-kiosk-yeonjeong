import * as dotenv from 'dotenv';

const mysql = require('mysql');

dotenv.config();

let _dbConn = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
});

console.log(process.env.MYSQL_HOST);

const _dbQuery = (sqlString, values) => {
  if (!values) values = [];

  return new Promise((resolve, reject) => {
    _dbConn.query(sqlString, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results);
    });
  });
};

const _dbQueryOne = (sqlString, values) => {
  if (!values) values = [];

  return new Promise((resolve, reject) => {
    _dbConn.query(sqlString, values, (err, results) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(results[0]);
    });
  });
};

export { _dbConn, _dbQuery, _dbQueryOne };
