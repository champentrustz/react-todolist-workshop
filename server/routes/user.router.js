const express = require('express');
const auth = require('../middlewares/auth')

const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/user', UserController.getUserJWT);
router.post('/register', UserController.addUser);
router.post('/login', UserController.getUser);

module.exports = router;