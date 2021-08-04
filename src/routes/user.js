const express = require('express');
const UserController = require('../controllers/user');
const auth = require('../middleware/auth');
const User = require('../models/user');
const router = new express.Router();

router.post('/user', UserController.addUser);

router.get('/users', UserController.viewUsers);

router.get('/users/:id', UserController.viewUser);

router.patch('/users/:id', UserController.updateUser);

router.delete('/users/:id', UserController.deleteUser);

router.post('/users/login', UserController.userLogin);

module.exports = router;