const db = require("../config/db");

// Összes szolgáltatás lekérése
exports.getAllSubscriptions = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM services", (err, results) => {
      if (err) return reject(err);
      if (results.length === 0){
        return reject({status: 404, message: "Nincsenek szolgáltatások!"});
      }
      resolve(results);
    });
  });
};

// Szolgáltatás lekérése ID alapján
exports.getSubscriptionById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM services WHERE szolg_azon = (?)", [id],
      (err, results) => {
      if (err) return reject(err);

      if (results.length === 0){
        return reject({status: 404, message: "Szolgáltatás nem található!"});
      }
      resolve(results);
    });
  });
};


// Új szolgáltatás felvétele
exports.createSubscription = (serv_name, cat_id, start, end, user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO szolgaltatasok (serv_name, cat_azon, kezdete, vege, user_id) VALUES (?,?,?,?,?)", [serv_name, cat_id, serv_start, serv_end, user_id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};

//Szolgáltatás frissítés
exports.updateSubscription = (id, serv_name, cat_id, start, end, user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE services SET serv_name = ?, cat_id = ?, serv_start = ?, serv_end = ?, user_id = ? WHERE serv_id = ?", [serv_name, cat_id, serv_start, serv_end, user_id, id],
      (err, result) => {
        if (err) return reject(err);

        if (result.affectedRows === 0) {
           return reject({status: 404, message: "Nem sikerült a szolgáltatást frissíteni!"});
        }

        resolve(result);
      }
    );
  });
};


//Szolgáltatás törlése
exports.deleteSubscription = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM services WHERE serv_id = ?", [id],
      (err, result) => {
        
        if (err) return reject(err.message);

        if (result.affectedRows === 0) {
           return reject({status: 404, message: "Nincs ilyen szolgáltatás!"});
        }
        resolve(result);
      }
    );
  });
};



// Lekéri a szolgáltatásokat a kategóriával és felhasználóval
exports.getAllSubscriptionsWithCategory = () => {
  return new Promise((resolve, reject) => {
    db.query(`
     SELECT s.serv_id,
       s.serv_name,
       s.serv_start,
       s.serv_end,
       s.cost,
       c.cat_id,
       c.cat_name,
       u.user_id,
       u.u_name AS user_name
FROM services s
LEFT JOIN category c ON s.cat_id = c.cat_id
LEFT JOIN user u ON s.user_id = u.user_id;
    `, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};



