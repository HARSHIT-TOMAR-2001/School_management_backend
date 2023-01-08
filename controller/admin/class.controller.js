require('dotenv').config();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Class = require('../../models/class.model');
const Schedule = require('../../models/daily_schedule.model');
const Student = require('../../models/student.model');
const Teacher = require('../../models/teacher.model');

const addClass = async (req, res) => {
  const { grade, division, grade_level, subjects, timing_half } = req.body;
  try {
    const newClass = new Class({
      Grade: grade,
      Division: division,
      Grade_level: grade_level,
      Subjects: subjects,
      Timing_half: timing_half,
      TeacherId:null
    });
    const ClassAdded = await newClass.save();

    let startingHour;
    if (timing_half == 'first') startingHour = 9;
    else startingHour = 13;

    //adding daily hourly schedules for each subject of this class
    for (let i = 0; i < subjects.length; i++) {
      const newSchedule = new Schedule({
        ClassId: ClassAdded.id,
        Subject: subjects[i],
        from_hour: startingHour,
        to_hour: startingHour + 1,
      });
      const ScheduleAdded = await newSchedule.save();
      startingHour += 1;
    }

    res.status(200).send({ success: true, message: 'Class added succesfully.' });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const classAvailableForStudent = async (req, res) => {
  const { StudentId } = req.query;
  try {
    const student = await Student.findById(StudentId);
    if (!student)
      res.status(400).send({ success: false, message: 'No Student is present with this Id' });
    const AvailableClass = await Class.find({
      Seats_left: { $gte: 1 },
      Grade: student.Class_grade,
    });
    if (AvailableClass.length == 0)
      res.status(400).send({ success: false, message: 'No class is available' });
    else res.status(200).send({ success: true, AvailableClasses: AvailableClass });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const assignClassToStudent = async (req, res) => {
  const { classId, studentId } = req.body;
  try {
    const student = await Student.findById(studentId);
    if (!student)
      res.status(400).send({ success: false, message: 'No Student is present with this Id' });
    if (student.ClassId != null)
      res.status(400).send({ success: false, message: 'Student is already enrolled in a class' });

    const classes = await Class.findById(classId);
    if (!classes)
      res.status(400).send({ success: false, message: 'No class is present with this Id' });
    const updateStudent = await Student.findByIdAndUpdate(studentId, {
      ClassId: classId,
    });
    const updateClass = await Class.findByIdAndUpdate(classId, {
      Seats_left: classes.Seats_left - 1,
    });
    res.status(200).send({ success: true, message: 'Class assigned succesfully.' });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  addClass,
  classAvailableForStudent,
  assignClassToStudent,
};
