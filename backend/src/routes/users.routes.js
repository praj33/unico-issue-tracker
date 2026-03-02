const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/users', usersController.createUser);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);

module.exports = router;