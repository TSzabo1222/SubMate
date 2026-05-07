
const db = require("../config/db");

// Összes szolgáltatás
exports.getAllSubscriptions = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT 
        s.*,
        u.u_name AS user_name
      FROM services s
      LEFT JOIN user u ON s.user_id = u.user_id`,
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

// ID alapján lekérés
exports.getSubscriptionById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT 
        s.*,
        u.u_name AS user_name
      FROM services s
      LEFT JOIN user u ON s.user_id = u.user_id
      WHERE s.serv_id = ?`,
      [id],
      (err, results) => {
        if (err) return reject(err);

        if (results.length === 0) {
          return reject({ status: 404, message: "Szolgáltatás nem található!" });
        }

        resolve(results[0]);
      }
    );
  });
};

// CREATE
exports.createSubscription = (serv_name, cat_id, serv_start, serv_end, cost, user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO services 
      (serv_name, cat_id, serv_start, serv_end, cost, user_id)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [serv_name, cat_id, serv_start, serv_end, cost, user_id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result.insertId);
      }
    );
  });
};

// UPDATE
exports.updateSubscription = (id, serv_name, cat_id, serv_start, serv_end, cost, user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE services 
       SET serv_name = ?, cat_id = ?, serv_start = ?, serv_end = ?, cost = ?, user_id = ?
       WHERE serv_id = ?`,
      [serv_name, cat_id, serv_start, serv_end, cost, user_id, id],
      (err, result) => {
        if (err) return reject(err);

        if (result.affectedRows === 0) {
          return reject({ status: 404, message: "Nem sikerült frissíteni!" });
        }

        resolve(result);
      }
    );
  });
};

// DELETE
exports.deleteSubscription = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM services WHERE serv_id = ?",
      [id],
      (err, result) => {
        if (err) return reject(err);

        if (result.affectedRows === 0) {
          return reject({ status: 404, message: "Nincs ilyen szolgáltatás!" });
        }

        resolve(result);
      }
    );
  });
};

// JOIN + kategória + user
exports.getAllSubscriptionsWithCategory = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT s.serv_id,
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
       LEFT JOIN user u ON s.user_id = u.user_id`,
      (err, results) => {
        if (err) return reject(err);
        resolve(results);
      }
    );
  });
};

// Lejárat státusz
exports.getSubscriptionExpById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT *,
        CASE 
          WHEN serv_end < NOW() THEN 'Lejárt'
          WHEN serv_end <= DATE_ADD(NOW(), INTERVAL 7 DAY) THEN 'Hamarosan lejár!'
          ELSE 'Érvényes'
        END AS status
      FROM services
      WHERE serv_id = ?`,
      [id],
      (err, results) => {
        if (err) return reject(err);

        if (results.length === 0) {
          return reject({ status: 404, message: "Szolgáltatás nem található!" });
        }

        resolve(results[0]);
      }
    );
  });
};