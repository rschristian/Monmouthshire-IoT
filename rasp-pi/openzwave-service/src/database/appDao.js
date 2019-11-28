// Adapted from https://stackabuse.com/a-sqlite-tutorial-with-node-js/
import sqlite3 from 'sqlite3';
import {Promise} from 'bluebird';
import logger from '../util/logger';

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        logger.error(`Could not connect to database ${err}`);
      } else {
        logger.info('Connected to database');
      }
    })
  }
  
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          logger.error(`Error running sql ${sql}`);
          logger.error(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      })
    })
  }
}

export default AppDAO;
