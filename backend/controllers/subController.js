const subsModel = require('../models/subsModel');

async function getAllSubscriptions(req, res){
     try {
        const subscriptions = await subsModel.getAllSubscriptions();
        return res.status(200).json(subscriptions);
      } catch (err) {
        return res.status(err.status || 500).json({ error: err.message || err });
      }

}

async function getSubscriptionById(req, res) {
    const { id } = req.params;
     try {
        const subscription = await subsModel.getSubscriptionById(id);
        return res.status(200).json(subscription);
      } catch (err) {
        return res.status(err.status || 500).json({ error: err.message || err });
      }
}


async function addSubscription(req, res) {
    const {serv_name, cat_id, serv_start, serv_end, id } = req.body;
    if (!serv_name || serv_name.trim() === "") {
        return res.status(400).json({ error: "A szolgáltatás neve nem lehet üres!" });
    }
    if (!cat_id|| isNaN(cat_id)) {
        return res.status(400).json({ error: "Érvényes kategória azonosító szükséges!" });
    }
    if (!serv_start|| !serv_end) {
        return res.status(400).json({ error: "A dátumok kitöltése kötelező!" });
    }
    if (new Date(serv_start) > new Date(serv_end)) {
        return res.status(400).json({ error: "A lejárat nem lehet korábbi a kezdésnél!" });
    }
    try {
        const subscription = await subsModel.createSubscription(serv_name, cat_id, serv_start, serv_end, id);
        return res.status(201).json({info : "Szolgáltatás hozzáadva!", data: subscription});
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
}


async function updateSubscription(req, res) {
    const { id } = req.params;
    const { serv_name, cat_id, serv_start, serv_end } = req.body;

    if (!serv_name || serv_name.trim() === "") {
        return res.status(400).json({ error: "A szolgáltatás neve nem lehet üres!" });
    }
    if (!cat_id|| isNaN(cat_id)) {
        return res.status(400).json({ error: "Érvényes kategória azonosító szükséges!" });
    }
    if (!serv_start|| !vege) {
        return res.status(400).json({ error: "A dátumok kitöltése kötelező!" });
    }
    if (new Date(serv_start) > new Date(serv_end)) {
        return res.status(400).json({ error: "A lejárat nem lehet korábbi a kezdésnél!" });
    }
    try {
        const subscription = await subsModel.updateSubscription(id, serv_name, cat_id, serv_start, serv_end,);
        return res.status(200).json({info : "Szolgáltatás fríssítve!"});
      } catch (err) {
       return res.status(err.status || 500).json({ error: err.message || err });
    }

}

async function deleteSubscription(req, res) {
    const { id } = req.params;
     try {
        const deletesubscription = await subsModel.deleteSubscription(id);
        return res.status(200).json({info : "Szolgáltatás törölve!"});
      } catch (err) {
       return res.status(err.status || 500).json({ error: err.message || err });
      }
    
}

// Lekéri a szolgáltatásokat a kategóriával és felhasználóval
exports.getAllSubscriptionsWithCategory = (req, res) => {
  const sql = `
    SELECT s.serv_id, s.serv_name, s.serv_start, s.serv_end, s.cost,
           c.cat_name,
           u.u_name AS user_name
    FROM services s
    LEFT JOIN category c ON s.cat_id = c.cat_id
    LEFT JOIN user u ON s.user_id = u.user_id
  `;
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};


module.exports = {
    getAllSubscriptions,
    getSubscriptionById,
    addSubscription,
    updateSubscription,
    deleteSubscription, 
    // getSubscriptionsWithCategory
};
