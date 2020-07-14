const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

function getUser (req, res) {
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

function addUser (req, res)  {
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

module.exports = {
    getUserJWT,
    addUser,
    getUser,
}
