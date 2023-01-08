const { signup, signin, getClassSchedule } = require('../controller/teacher.controller');
const verifyToken = require('../middleware/auth');

const teacherRouter = require('express').Router();

teacherRouter.post('/signup', signup);
teacherRouter.post('/signin', signin);
teacherRouter.get('/class/schedule', verifyToken, getClassSchedule);
module.exports = teacherRouter;
