const { approveStudent, approveTeacher } = require('../controller/admin/approve.controller');
const { signup, signin } = require('../controller/admin/auth.controller');
const {
  addClass,
  classAvailableForStudent,
  assignClassToStudent,
} = require('../controller/admin/class.controller');
const {
  getTeachersAvailableForTheScheduleClass,
  getAllUnassignedSchedule,
  assignedScheduleToTeacher,
} = require('../controller/admin/schedule.controller');
const verifyToken = require('../middleware/auth');
const adminRouter = require('express').Router();

adminRouter.post('/signup', signup);
adminRouter.post('/signin', signin);
adminRouter.post('/add/class', verifyToken, addClass);
adminRouter.get('/class/available', verifyToken, classAvailableForStudent);

adminRouter.post('/approve/student', verifyToken, approveStudent);
adminRouter.post('/approve/teacher', approveTeacher);

adminRouter.get('/schedule/teacher/available', verifyToken, getTeachersAvailableForTheScheduleClass);
adminRouter.get('/schedule/all/unassign', verifyToken, getAllUnassignedSchedule);

adminRouter.post('/assign/schedule', verifyToken, assignedScheduleToTeacher);
adminRouter.post('/assign/class', verifyToken, assignClassToStudent);

module.exports = adminRouter;
