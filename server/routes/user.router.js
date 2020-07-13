const express = require('express');
const auth = require('../middlewares/auth')

const UserController = require('../controllers/user.controller');

const router = express.Router();

router.post('/users', auth, UserController.getUsers);
router.post('/register', UserController.addUser);

module.exports = router;