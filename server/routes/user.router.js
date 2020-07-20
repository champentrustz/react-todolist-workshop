const express = require('express');
const auth = require('../middlewares/auth')

const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/user', UserController.getUserJWT);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/get-user-details', auth, UserController.getUserDetails);

module.exports = router;