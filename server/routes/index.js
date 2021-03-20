const express = require('express');



const userRouter = require('./user.router');
const taskRouter = require('./task.router');
const projectRouter = require('./project.router');

const rootRouter = express.Router();

rootRouter.use('/user',userRouter);
rootRouter.use('/project',projectRouter);
rootRouter.use('/task',taskRouter);

module.exports = rootRouter;