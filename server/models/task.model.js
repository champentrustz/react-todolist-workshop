const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    project:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Project'
    },
    name:{
        type: String,
        required: true
    }
},
    {timestamp:true});

module.exports = mongoose.model('Task', taskSchema);