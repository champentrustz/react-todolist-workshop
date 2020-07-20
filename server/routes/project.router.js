const express = require('express');
const auth = require('../middlewares/auth')

const ProjectController = require('../controllers/project.controller');

const router = express.Router();

router.post('/add-project', auth, ProjectController.addProject);

module.exports = router;