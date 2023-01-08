const adminRouter = require('./admin.router');
const studentRouter = require('./student.router');
const teacherRouter = require('./teacher.router');
const Router = require('express').Router();

Router.use('/student', studentRouter);
Router.use('/teacher', teacherRouter);
Router.use('/admin', adminRouter);
module.exports = Router;
