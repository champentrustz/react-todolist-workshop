const Task = require('../models/task.model');
const Project = require('../models/project.model');

function addTask(req, res) {
    const projectID = req.body.projectID;
    const name = req.body.name;
}