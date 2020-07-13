const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!users.length) {
            return res
                .status(404).json({success: false, error: `User`})
        }
        return res.status(200).json({data: users})
    }).catch(err => console.log(err))
}

const addUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    User.findOne({username}).then(user => {
        if (user) {
            return res.status(400).json({msg: 'User is already exist'});
        }
        const newUser = new User({username, password, name});
        newUser.save()
            .then(user => {
                return jwt.sign(
                    {id: user.id},
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
    })


}

module.exports = {
    getUsers,
    addUser,
}
