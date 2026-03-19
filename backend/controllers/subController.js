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

module.exports = {
    getAllSubscriptions,
    getSubscriptionById,
    addSubscription,
    updateSubscription,
    deleteSubscription
};
