require('dotenv').config();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Schedule = require('../../models/daily_schedule.model');
const Teacher = require('../../models/teacher.model');

const getTeachersAvailableForTheScheduleClass = async (req, res) => {
  const { ScheduleId } = req.query;
  try {
    const schedule = await Schedule.findById(ScheduleId).populate('ClassId');
    if (!schedule)
      res.status(400).send({ success: false, message: 'No schedule is present with this Id' });

    //Find Allteachers with this subject and grade level and been assigned classes less than three
    const allTeachers = await Teacher.find({
      assignedClasses: { $lt: 3 },
      Grade_level: schedule.ClassId.Grade_level,
      Subjects: {
        $in: [schedule.Subject],
      },
    });
    const ValidTeachers = [];
    if (allTeachers.length > 0) {
      for (let i = 0; i < allTeachers.length; i++) {
        let ValidCount = await Schedule.find({
          TeacherId: allTeachers[i].id,
          from_hour: schedule.from_hour,
        }).then(async (data) => {
          if (data.length == 0) {
            ValidTeachers.push(allTeachers[i]);
            if (i == allTeachers.length - 1)
              return res.status(200).send({ success: true, Available_Teachers: ValidTeachers });
          } else {
            if (i == allTeachers.length - 1)
              return res.status(200).send({ success: true, Available_Teachers: ValidTeachers });
          }
        });
      }
    } else {
      return res.status(200).send({ success: true, Available_Teachers: ValidTeachers });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getAllUnassignedSchedule = async (req, res) => {
  try {
    const UnassignedSchedule = await Schedule.find({
      TeacherId: null,
    });
    return res.status(200).send({ success: true, Unassigned_Schedules: UnassignedSchedule });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const assignedScheduleToTeacher = async (req, res) => {
  const { teacherId, scheduleId } = req.body;
  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher)
      res.status(400).send({ success: false, message: 'No Teacher is present with this Id' });
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule)
      res.status(400).send({ success: false, message: 'No Schedule is present with this Id' });

    const updateSchedule = await Schedule.findByIdAndUpdate(scheduleId, {
      TeacherId: teacherId,
    });
    const updateTeacher = await Teacher.findByIdAndUpdate(teacherId, {
      assignedClasses: teacher.assignedClasses + 1,
    });
    return res
      .status(200)
      .send({ success: true, message: 'Teacher assigned to the schedule successfully!' });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  getTeachersAvailableForTheScheduleClass,
  getAllUnassignedSchedule,
  assignedScheduleToTeacher,
};
