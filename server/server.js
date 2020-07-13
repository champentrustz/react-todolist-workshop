const express = require('express');
const cors = require('cors');
const db = require('./database');

const userRouter = require('./routes/user.router');
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());


db.on('open', () =>{
    console.log("Success!")
});

app.use('/api', userRouter);



app.listen(port, () => {
    console.log('Server is running on port: ',port);
});