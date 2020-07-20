const Project = require('../models/project.model');
const User = require('../models/user.model');

function addProject(req, res) {
    const userID = req.body.userID;
    const name = req.body.name;
    User.findOne({_id: userID}).populate('projects').then(user => {
        if (!user) {
            return res.status(401).json({msg: 'No user'});
        }
        const newProject = new Project({user: userID, name: name})
        newProject.save()
            .then(project => {
                user.projects.push(project);
                user.save()
                    .then(user => {
                        return res.json(user);
                    })
            }).catch(err => {
            return res.status(400).json({success: false, error: err});
        })

    }).catch(err => {
        return res.status(401).json({msg: 'No user', error: err})
    })
}


module.exports = {
    addProject,
}