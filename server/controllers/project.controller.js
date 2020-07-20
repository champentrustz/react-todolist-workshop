const Project = require('../models/project.model');
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

function addProject(req, res) {
    const userID = res.body.userID;
    const name = res.body.name;
    User.findOne({_id : userID}).then(user =>{
        if(user){
            const newProject = new Project({user:userID,name:name})
            newProject.save()
                .then(project =>{
                    user.projects.push(project);
                    user.save().then(user =>{
                        return res.json(user);
                    })
                }).catch(err=>{
                    return res.status(400).json({success:false, error:err});
            })

        }

        return res.status(401).json({msg: 'Unauthorized'});
    })
}

module.exports = {
    addProject,
}