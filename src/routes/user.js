const express = require('express');
const UserController = require('../controllers/user');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/user');
const router = new express.Router();


// User Routes

router.post('/user', UserController.addUser);

router.get('/users/:id', UserController.viewUser);

router.get('/user/profile', UserController.myProfile);

router.post('/user/logout', UserController.logout);

router.post('/users/login', UserController.userLogin);



// Admin Routes

router.post('/user/admin', UserController.addAdminUser);

router.get('/users', UserController.viewUsers);

router.patch('/users/:id', UserController.updateUser);

router.delete('/users/:id', UserController.deleteUser);




module.exports = router;