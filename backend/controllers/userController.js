const User = require("../models/userModel");

//GET /users
exports.getUsers = async (req, res) => {
  try {
    const {id} = req.params;
    const users = await User.getUser(id);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err,message });
  }
};


//GET / user (login controller ???)
exports.getUserByPass = async (req, res) => {
  try {
    const user = await User.getAllUsers();
    if (!user) {
       return res.status(404).json({ error: 'Felhasználó nem található' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//POST /user
exports.createUser = async (req, res) => {
  try {
    const { id, u_name, pw, email, gender, isactive, u_role } = req.body;
    const idx = await User.createUser(id, u_name, pw, email, gender, isactive, u_role);
    res.json({ message: "Felhasználó hozzáadva", idx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//PUT  /users
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { u_name, pw, email, gender, isactive, u_role } = req.body;
    console.log(req.body);
    const user = await User.updateUser(u_name, pw, email, gender, isactive, u_role, id);
    if (user==1) {
      res.status(200).json({ message: "Felhasználó fríssítve!" });
    } else {
      res.status(404).json({ message: "Felhasználó nem található!"});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//DELETE /user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.deleteUser(id);
    if (user>0) {
      return res.status(200).json({ message: "Felhasználó törölve!"});
    } else {
      return res.status(404).json({ message: "Felhasználó nem található!"});
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};