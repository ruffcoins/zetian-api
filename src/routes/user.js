const express = require('express');
const UserController = require('../controllers/user');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/user');
const router = new express.Router();


// User Routes

router.get('/users/:id', userAuth, UserController.viewUser);

router.get('/user/profile', userAuth, UserController.myProfile);

router.post('/user/logout', userAuth, UserController.logout);

router.post('/users/login', UserController.userLogin);



// Admin Routes

router.post('/user', adminAuth, UserController.addUser);

router.post('/user/admin', adminAuth, UserController.addAdminUser);

router.get('/users', userAuth, UserController.viewUsers);

router.patch('/users/:id', adminAuth, UserController.updateUser);

router.delete('/users/:id', adminAuth, UserController.deleteUser);




module.exports = router;