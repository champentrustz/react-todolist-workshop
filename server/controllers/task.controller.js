const Task = require('../models/task.model');
const Project = require('../models/project.model');
const User = require('../models/user.model');

function addTask(req, res) {
    const projectID = req.body.projectID;
    const userID = req.body.userID;
    const name = req.body.name;
    const time = req.body.time;
    const date = req.body.date;
    Project.findOne({_id: projectID}).exec((err,project) =>{
        if(!project){
            return res.status(400).json({msg : 'No projectID'});
        }

        if(err){
            return res.status(400).json({err});
        }

        const newTask = new Task({name,time,date});
        newTask.save()
            .then((task) =>{
                project.tasks.push(task);
                project.save()
                    .then(() => {

                        const userID = req.user.id;
                        User.findOne({_id : userID},'name').populate({
                            path : 'projects',
                            populate : {
                                path : 'tasks'
                            }
                        }).exec((err,user) =>{
                            if(err){
                                return res.status(400).json({error : err});
                            }
                            return res.status(200).json({user});
                        })


                    }).catch(err =>{
                        return res.status(400).json({error : err});
                })
            })
    })
}

module.exports = {
    addTask,
}