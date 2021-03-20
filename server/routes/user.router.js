const express = require('express');
const auth = require('../middlewares/auth')

const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/get-auth', UserController.getUserJWT);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/get-user-details', auth, UserController.getUserDetails);

module.exports = router;