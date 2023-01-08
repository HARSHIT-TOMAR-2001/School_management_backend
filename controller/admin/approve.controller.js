require('dotenv').config();

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Student = require('../../models/student.model');
const Teacher = require('../../models/teacher.model');

const approveStudent = async (req, res) => {
  const { StudentId } = req.body;
  try {
    const student = await Student.findById(StudentId);
    if (!student)
      res.status(400).send({ success: false, message: 'No Student is present with this Id' });
    const updateStudent = await Student.findByIdAndUpdate(StudentId, {
      isApproved: true,
    });
    return res.status(200).send({ success: true, message: 'Student Approved successfully!' });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const approveTeacher = async (req, res) => {
  const { TeacherId } = req.body;
  try {
    const teacher = await Teacher.findById(TeacherId);
    if (!teacher)
      res.status(400).send({ success: false, message: 'No Teacher is present with this Id' });
    const updateTeacher = await Teacher.findByIdAndUpdate(TeacherId, {
      isApproved: true,
    });
    return res.status(200).send({ success: true, message: 'Teacher Approved successfully!' });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  approveStudent,
  approveTeacher,
};
