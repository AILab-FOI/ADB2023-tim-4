const sqlite3 = require("sqlite3");
const fs = require("fs");
const path = require("path");
class Database {

  constructor() {
    
  }

  connectToDb(){
    const dbPath = path.resolve(__dirname, "./database.sqlite");
    this.db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error(err.message);
        }
      });
  }


  executeQuery(sql, queryData) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, queryData, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  closeConectionToDb() {
    this.db.close((err) => {
      if (err) {
        console.error(err.message);
      }
    });
  }
}

module.exports = Database;
