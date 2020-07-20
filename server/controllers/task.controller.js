const Task = require('../models/task.model');
const Project = require('../models/project.model');

function addTask(req, res) {
    const projectID = req.body.projectID;
    const userID = req.body.userID;
    const name = req.body.name;
    const time = req.body.time;
    const date = req.body.date;
    Project.findOne({_id: projectID}).populate('tasks').then(project =>{
        if(!project){
            return res.status(400).json({msg : 'No projectID'});
        }

        const newTask = new Task({name,time,date});
        newTask.save()
            .then(task =>{
                project.tasks.push(task);
                project.save()
                    .then(project =>{
                        return res.status(200).json({project});
                    }).catch(err => {
                    return res.status(400).json({error : err});
                })
            }).catch(err =>{
                return res.status(400).json({error : err});
        })
    })
}

module.exports = {
    addTask,
}