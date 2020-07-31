const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    project:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Project'
    },
    date:{
        type: String,
    },
    time:{
        type: String,
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);