const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
        user: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        }
    },
    {timestamps: true});

module.exports = mongoose.model('Project', projectSchema);