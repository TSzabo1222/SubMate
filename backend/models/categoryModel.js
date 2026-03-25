const db = require("../config/db");

// Összes kategória lekérése
exports.getAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM category", (err, results) => {
      if (err) return reject(err);
      if (results.length === 0){
        return reject({status: 404, message: "Nincsenek kategóriák!"});
      }
      resolve(results);
    });
  });
};

// // Kategória lekérése ID alapján
// exports.getCategoryByName = (cat_name) => {
//   return new Promise((resolve, reject) => {
//     db.query("SELECT cat_id FROM category WHERE cat_name = (?)", [cat_name],
//       (err, results) => {
//        if (err) return reject(err);

//       if (results.length === 0){
//         return reject({status: 404, message: "Kategória nem található!"});
//       }
//       resolve(results);
//     });
//   });
// };

// Kategória lekérése ID alapján
exports.getCategoryByName = (cat_name) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT cat_id FROM category WHERE cat_name = (?)", [cat_name,],
      (err, results) => {
       if (err) return reject(err);

      if (results.length === 0){
        return reject({status: 404, message: "Kategória nem található!"});
      }
      resolve(results);
    });
  });
};


// Új kategória felvétele
exports.createCategory = (cat_name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO category(cat_name) VALUES (?)", [cat_name],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};

//Kategória frissítés
exports.updateCategory = (id, cat_name) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE category SET cat_name = ? WHERE cat_id = ?", [cat_name, id],
      (err, result) => {
        if (err) return reject(err);

        if (result.affectedRows === 0) {
           return reject({status: 404, message: "Nem sikerült a kategóriát frissíteni!"});
        }
        resolve(result);
      }
    );
  });
};


//Kategória törlése
exports.deleteCategory = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM category WHERE cat_id = ?", [id],
      (err, result) => {
        
        if (err) return reject(err.message);

        if (result.affectedRows === 0) {
           return reject({status: 404, message: "Nincs ilyen category!"});
        }
        resolve(result);
      }
    );
  });
}