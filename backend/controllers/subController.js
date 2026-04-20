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

// CREATE
async function addSubscription(req, res) {
  const { serv_name, cat_id, serv_start, serv_end, cost, user_id } = req.body;

  if (!serv_name || !cat_id || !serv_start || !serv_end) {
    return res.status(400).json({ error: "Hiányzó mezők!" });
  }

  if (new Date(serv_start) > new Date(serv_end)) {
    return res.status(400).json({ error: "Hibás dátumok!" });
  }

  try {
    const id = await subsModel.createSubscription(
      serv_name,
      cat_id,
      serv_start,
      serv_end,
      cost,
      user_id
    );

    res.status(201).json({ message: "Létrehozva!", id });
  } catch (err) {
    res.status(500).json({ error: err.message || err });
  }
}


async function updateSubscription(req, res) {
    const { id } = req.params;
    const { serv_name, cat_id, serv_start, serv_end, cost, user_id } = req.body;

    if (!serv_name || serv_name.trim() === "") {
        return res.status(400).json({ error: "A szolgáltatás neve nem lehet üres!" });
    }

    if (!cat_id || isNaN(cat_id)) {
        return res.status(400).json({ error: "Érvényes kategória azonosító szükséges!" });
    }

    if (!serv_start || !serv_end) {
        return res.status(400).json({ error: "A dátumok kitöltése kötelező!" });
    }

    if (new Date(serv_start) > new Date(serv_end)) {
        return res.status(400).json({ error: "A lejárat nem lehet korábbi a kezdésnél!" });
    }

    try {
        await subsModel.updateSubscription(
            id,
            serv_name,
            cat_id,
            serv_start,
            serv_end,
            cost,
            user_id
        );

        return res.status(200).json({ info: "Szolgáltatás frissítve!" });

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


async function getAllSubscriptionsWithCategory(req, res) {
  try {
    const data = await subsModel.getAllSubscriptionsWithCategory();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getExpiringSubscriptions(req, res) {
  const days = 7;
  const { id } = req.params;
  try {
    const data = await subsModel.getSubscriptionExpById(id);
    console.log("Lejáró szolgáltatások:", data);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
    getAllSubscriptions,
    getSubscriptionById,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    getAllSubscriptionsWithCategory,
    getExpiringSubscriptions
};