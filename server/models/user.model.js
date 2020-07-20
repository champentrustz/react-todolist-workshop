const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 4
        },
        password: {
            type: String,
            required: true
        },
        projects: [
            {
                type: mongoose.Schema.Types.ObjectID,
                ref:'Project'
            }
        ]
    },
    {timestamps: true});


module.exports = mongoose.model('User', userSchema);
