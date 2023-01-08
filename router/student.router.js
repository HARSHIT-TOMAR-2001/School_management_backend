const { signup, signin, getClassSchedule } = require('../controller/student.controller');
const verifyToken = require('../middleware/auth');

const studentRouter = require('express').Router();

studentRouter.post('/signup', signup);
studentRouter.post('/signin', signin);
studentRouter.get('/class/schedule', verifyToken, getClassSchedule);
module.exports = studentRouter;
