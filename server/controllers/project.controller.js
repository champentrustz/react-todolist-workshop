const Project = require('../models/project.model');
const User = require('../models/user.model');

function addProject(req, res) {
    const userID = req.user.id;
    const name = req.body.name;
    const type = req.body.type;
    User.findOne({_id: userID}).populate('projects').then(user => {
        if (!user) {
            return res.status(401).json({msg: 'No user'});
        }
        const newProject = new Project({user: userID, name: name, type: type})
        newProject.save()
            .then(project => {
                user.projects.push(project);
                user.save()
                    .then(user => {
                        return res.json({user});
                    })
            }).catch(err => {
            return res.status(400).json({success: false, error: err});
        })
    }).catch(err => {
        return res.status(401).json({msg: 'No user', error: err})
    })
}

function updateProject(req, res){
    const projectID = req.body.id;
    const name = req.body.name
    Project.findOneAndUpdate({_id: projectID},{$set:{name:name}}, {
        new:true
    }).then(project => {
        return res.status(200).json({project})
        })
}

module.exports = {
    addProject,
    updateProject
}