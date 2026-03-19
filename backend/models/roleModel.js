const db = require("../config/db");

//role lekérése id alapján
exports.getRoleById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT role_id, roles FROM roles WHERE role_id like (?) ", [id],
      (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.getRoles = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT role_id, roles FROM roles", 
      (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};