const db = require("../config/db");

// Összes user lekérése
exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM user", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// // User lekérése felhasználónév alapján
// exports.getUser = (u_name,pw) => {
//   return new Promise((resolve, reject) => {
//     db.query("SELECT user_id FROM user WHERE user_name like (?) AND pw like (?)", [u_name,pw],
//       (err, results) => {
//       if (err) return reject(err);
//       resolve(results);
//     });
//   });
// };


// User lekérése felhasználónév alapján
exports.getUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT id, u_name, pw, email, gender, isactive, u_role FROM user WHERE id like (?) ", [id],
      (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Új user felvétele
exports.createUser = (id, u_name, pw, email, gender, isactive, u_role) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO user (id, u_name, pw, email, gender, isactive, u_role) VALUES (?, ?,?,?,?,?,?)", [id, u_name, pw, email, gender, isactive, u_role] ,
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};

//frissítése
exports.updateUser = (u_name, pw, email, gender, isactive, u_role, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE user SET u_name = ?, pw = ?, email = ?, gender = ?, isactive = ?, u_role=? WHERE id = ?",
      [ u_name, pw, email, gender, isactive, u_role, id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.affectedRows); 
      }
    );
  });
};

//törlése 
exports.deleteUser = (id) => {
  return new Promise((resolve, reject) => {

    db.query(
      "DELETE FROM services WHERE user_id = ?",
      [id],
      (err) => {
        if (err) return reject(err);

        db.query(
          "DELETE FROM user WHERE user_id = ?",
          [id],
          (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows);
          }
        );

      }
    );

  });
};