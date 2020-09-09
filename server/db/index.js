const sqlite = require("sqlite3").verbose();
const DB_PATH = "./db/oral_final_db.db";
const db = new sqlite.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
});
db.query = function (sql, params) {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.all(sql, params, function (error, rows) {
      if (error) reject(error);
      else resolve({ rows: rows });
    });
  });
};
module.exports = db;
