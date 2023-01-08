require('dotenv').config();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Student = require('../models/student.model');
const Schedule = require('../models/daily_schedule.model');

const signup = async (req, res) => {
  const { name, email, password, Class_grade, Timing_half } = req.body;
  try {
    const result = await Student.findOne({ email });

    if (result) {
      return res.status(400).send({ msg: 'Student already exist with this email' });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newStudent = new Student({
        name,
        email,
        Class_grade,
        Timing_half,
        password: encryptedPassword,
      });
      await newStudent.save();

      res.status(200).send({ success: true, msg: 'Student succesfully registered' });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await Student.findOne({ email });
    if (result === null) {
      return res.status(400).send({ msg: 'No Student exist with this email' });
    } else {
      const encryptedPassword = bcrypt.compare(password, result.password);
      if (!encryptedPassword) return res.status(400).send({ message: 'wrong password' });
      if (!result.isApproved)
        return res.status(400).send({ message: 'Student not verified yet, Please contact admin!' });
      const token = jwt.sign(
        {
          name: result.name,
          email: result.email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h',
        },
      );

      const updatedStudent = await Student.findByIdAndUpdate(result.id, {
        authToken: token,
      });
      res.status(200).send({
        success: true,
        studentId: updatedStudent.id,
        student_name: updatedStudent.name,
        student_class_id: updatedStudent.ClassId,
        token: updatedStudent.authToken,
      });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getClassSchedule = async (req, res) => {
  const { classId } = req.query;
  try {
    const DailyTimeTable = await Schedule.find({ ClassId: classId }).sort({ createdAt: 1 });
    res.status(200).send({ success: true, daily_classes: DailyTimeTable });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = {
  signup,
  signin,
  getClassSchedule,
};
