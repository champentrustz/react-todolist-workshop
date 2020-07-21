const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const Project = require('../models/project.model');

const jwtSecret = process.env.JWT_SECRET;

function login (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username : username, password : password}).then(user =>{
        if(!user){
            return res.status(400).json({msg : 'Username does not exist'});
        }
        return jwt.sign(
            {
                id: user.id,
                name: user.name,
            },
            jwtSecret,
            {expiresIn: 3600},
            (err, token) => {
                if (err) throw err;
                res.json({
                    success: true,
                    token: token,
                    user: {
                        id: user.id,
                        name: user.name
                    }
                })
            }
        )

    })
}

function getUserJWT (req, res) {
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({success: false, msg: 'No token, authorization denied'});
    }
    try{
        const decoded = jwt.verify(token, jwtSecret);
        return res.json({
            success : true,
            user : decoded,
        });


    }catch (err) {
        return res.status(400).json({success: false, msg : 'Token is not valid'});
    }
}

function register (req, res)  {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    User.findOne({username}).then(user => {
        if (user) {
            return res.status(400).json({success: false, msg: 'Wrong username or password'});
        }
        const newUser = new User({username, password, name});
        newUser.save()
            .then(user => {
                const newProject = new Project({user: user, name: 'Inbox', type: 'INITIAL'})
                newProject.save()
                    .then((project) =>{
                        user.projects.push(project);
                        user.save()
                            .then((user) => {
                                return jwt.sign(
                                    {
                                        id: user.id,
                                        name: user.name,
                                    },
                                    jwtSecret,
                                    {expiresIn: 3600},
                                    (err, token) => {
                                        if (err) throw err;
                                        res.json({
                                            success: true,
                                            token: token,
                                            user: {
                                                id: user.id,
                                                name: user.name
                                            }
                                        })
                                    }
                                )
                            })
                })
            })
            .catch(err => {
                return res.status(400).json({
                    err,
                    message: 'User not created!',
                })
            })
    }).catch((err) =>{
        return res.status(400).json({success: false, msg: 'Wrong username or password'});
    })
}

function getUserDetails(req, res){
    const userID = req.user.id;
    User.findOne({_id : userID},'name').populate({
        path : 'projects',
        populate : {
            path : 'tasks'
        }
    }).exec((err,user) =>{
            if(!user){
                return res.status(400).json({msg : 'No user'});
            }
            if(err){
                return res.status(400).json({error : err});
            }
            return res.json({user});
        })
}

module.exports = {
    getUserJWT,
    register,
    login,
    getUserDetails,
}
