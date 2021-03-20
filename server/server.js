const express = require('express');
const cors = require('cors');
const db = require('./database');

const router = require('./routes');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());


db.on('open', () =>{
    console.log("Success!")
});

app.use('/api', router);



app.listen(port, () => {
    console.log('Server is running on port: ',port);
});