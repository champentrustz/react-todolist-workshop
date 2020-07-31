const Project = require('../models/project.model');
const User = require('../models/user.model');
const Task = require('../models/task.model');

function addProject(req, res) {
    const userID = req.user.id;
    const name = req.body.name;
    const type = req.body.type;
    User.findOne({_id: userID}).populate({
        path : 'projects',
        populate : {
            path : 'tasks'
        }
    }).exec((err,user) =>{
        if (!user) {
            return res.status(401).json({msg: 'No user'});
        }
        if(err){
            return res.status(400).json({err});
        }
        const newProject = new Project({user: userID, name: name, type: type})
        newProject.save()
            .then(project => {
                user.projects.push(project);
                user.save()
                    .then(user => {
                        return res.json({user});
                    })
            })
    })
}

function editProject(req, res){
    const userID = req.user.id;
    const projectID = req.body.id;
    const name = req.body.name
    Project.findOneAndUpdate({_id: projectID},{$set:{name:name}}, {
        new:true
    }).then(() => {

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

        })
}

function deleteProject(req, res){
    const projectID = req.body.id;
    const userID = req.user.id;

    Project.findOneAndDelete({_id: projectID}).then(project =>{

            project.tasks.map(task=>{
                Task.findByIdAndDelete(task,{},err=>{
                    if(err){
                        return res.json({err});
                    }
                })
            })

        User.findOneAndUpdate(
            { _id: project.user },
            { $pull: { projects :  project._id } },
            { safe: true },
            (err)=>{

                if(err){
                    return res.json({err})
                }
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
            })





    })



    }

module.exports = {
    addProject,
    editProject,
    deleteProject
}