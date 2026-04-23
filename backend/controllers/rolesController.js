const Role = require("../models/roleModel");

exports.getRoleById = async (req, res) => {
  try {
    const id = req.params.id;
    const role= await Role.getRoleById(id);
    if (!role) {
       return res.status(404).json({ error: 'Jogosultság nem található' });
    }
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getRoles = async (req, res) => {
  try {
    const roles= await Role.getRoles();
    if (!roles) {
       return res.status(404).json({ error: 'Jogosultságok nincsenek eltárolva' });
    }
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};