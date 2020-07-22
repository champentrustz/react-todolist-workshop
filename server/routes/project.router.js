const express = require('express');
const auth = require('../middlewares/auth')

const ProjectController = require('../controllers/project.controller');

const router = express.Router();

router.post('/add-project', auth, ProjectController.addProject);
router.post('/edit-project', auth, ProjectController.editProject);
router.post('/delete-project', auth, ProjectController.deleteProject);

module.exports = router;