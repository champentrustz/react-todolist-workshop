const express = require('express');
const auth = require('../middlewares/auth')

const TaskController = require('../controllers/task.controller');

const router = express.Router();

router.post('/add-task', auth, TaskController.addTask);

module.exports = router;