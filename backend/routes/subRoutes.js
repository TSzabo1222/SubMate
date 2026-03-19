const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const catController = require('../controllers/categoryController')
const subscriptController = require('../controllers/subController');
const rolesController = require('../controllers/rolesController');


//FELHASZ
router.get('/users', userController.getUserByPass);
router.get('/users/:id', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/user/:id',userController.deleteUser);

//KATEGORIA
router.get('/category', catController.getCategoryByName);
router.get('/categories', catController.getAllCategories);
router.post('/category', catController.createCategory);
router.put('/category/:id', catController.updateCategory);
router.delete('/category/:id', catController.deleteCategory);

//SZOLG
router.get('/subscriptions', subscriptController.getAllSubscriptions);
router.get('/subscription/:id', subscriptController.getSubscriptionById);
router.post('/subscription', subscriptController.addSubscription);
router.put('/subscription/:id', subscriptController.updateSubscription);
router.delete('/subscription/:id', subscriptController.deleteSubscription);


//Jogosultság
router.get('/role/:id', rolesController.getRoleById);
router.get('/roles', rolesController.getRoles);


/*
//VEZERLOPULT
router.get('/login',....);
router.get('/logout',....);
router.get('/dashboard'.....); // felhasználó szolgáltatásai...
*/
module.exports = router;