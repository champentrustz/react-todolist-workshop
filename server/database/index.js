const mongoose = require('mongoose');

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})

const db = mongoose.connection;

module.exports = db;