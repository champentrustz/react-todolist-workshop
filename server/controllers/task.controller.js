const Task = require('../models/task.model');
const Project = require('../models/project.model');
const User = require('../models/user.model');

function addTask(req, res) {
    const userID = req.user.id;
    const projectID = req.body.id;
    const task = req.body.task;
    const time = req.body.time;
    const date = req.body.date;
    Project.findOne({_id: projectID}).exec((err,project) =>{
        if(!project){
            return res.status(400).json({msg : 'No projectID'});
        }

        if(err){
            return res.status(400).json({err});
        }

        const newTask = new Task({name : task,time : time,date : date, project : project});
        newTask.save()
            .then((task) =>{
                project.tasks.push(task);
                project.save()
                    .then(() => {


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

function deleteTask(req, res) {
    const taskID = req.body.taskID;
    const userID = req.user.id;
    Task.findOneAndDelete({_id: taskID}).then(task =>{
        Project.findOneAndUpdate(
            {_id: task.project},
            {$pull: {tasks: task._id}},
            {safe: true}).then(()=>{
            User.findOne({_id: userID}, 'name').populate({
                path: 'projects',
                populate: {
                    path: 'tasks'
                }
            }).exec((err, user) => {
                if (err) {
                    return res.status(400).json({error: err});
                }
                return res.status(200).json({user});
            })
        })
    })
}

function editTask(req, res){
    const userID = req.user.id;
    const taskID = req.body.taskID;
    const projectID = req.body.projectID;
    const taskName = req.body.task;
    const time = req.body.time;
    const date = req.body.date;

    Task.findOne({_id: taskID}).then(task => {

        if (''+task.project === projectID) {
            Task.findOneAndUpdate({_id: task._id},{name: taskName, time: time, date: date},{
                new:true
            }).then(() => {

                User.findOne({_id: userID}, 'name').populate({
                    path: 'projects',
                    populate: {
                        path: 'tasks'
                    }
                }).exec((err, user) => {
                    if (err) {
                        return res.status(400).json({error: err});
                    }
                    return res.status(200).json({user});
                })

            })
        }else{
            Project.findOneAndUpdate(
                {_id: task.project},
                {$pull: {tasks: task._id}},
                {safe: true}).then(()=>{
                Task.findOneAndUpdate({_id: task._id},{name: taskName, time: time, date: date,project: projectID},{
                        new:true
                    }).then(NewTask => {
                   Project.findOne({_id: NewTask.project}).then(project=>{
                        project.tasks.push(task);
                        project.save()
                            .then(() => {
                                User.findOne({_id: userID}, 'name').populate({
                                    path: 'projects',
                                    populate: {
                                        path: 'tasks'
                                    }
                                }).exec((err, user) => {
                                    if (err) {
                                        return res.status(400).json({error: err});
                                    }
                                    return res.status(200).json({user});
                                })
                            })
                   })
                })
            })
        }

    })

}

module.exports = {
    addTask,
    editTask,
    deleteTask
}