require('dotenv').config();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Schedule = require('../models/daily_schedule.model');
const Teacher = require('../models/teacher.model');

const signup = async (req, res) => {
  const { name, email, password, subjects, grade_level } = req.body;
  try {
    const result = await Teacher.findOne({ email });

    if (result) {
      return res.status(400).send({ msg: 'Teacher already exist with this email' });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const newTeacher = new Teacher({
        name,
        email,
        Subjects: subjects,
        Grade_level: grade_level,
        password: encryptedPassword,
      });
      await newTeacher.save();

      res.status(200).send({ success: true, msg: 'Teacher succesfully registered' });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await Teacher.findOne({ email });
    if (result === null) {
      return res.status(400).send({ msg: 'No teacher exist with this email' });
    } else {
      const encryptedPassword = bcrypt.compare(password, result.password);
      if (!encryptedPassword) return res.status(400).send({ message: 'wrong password' });
      if (!result.isApproved)
        return res.status(400).send({ message: 'Teacher not verified yet, Please contact admin!' });
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

      const updatedTeacher = await Teacher.findByIdAndUpdate(result.id, {
        authToken: token,
      });

      res
        .status(200)
        .send({
          success: true,
          teacherId: updatedTeacher.id,
          teacher_name: updatedTeacher.name,
          token: updatedTeacher.authToken,
        });
    }
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getClassSchedule = async (req, res) => {
  const { teacherId } = req.query;
  try {
    const DailyTimeTable = await Schedule.find({ TeacherId: teacherId }).sort({ createdAt: 1 });
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
