let mongoose = require('mongoose');

const limit = (val) => {
  return val.length <= 3;
};

const TeacherSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    authToken: String,
    assignedClasses:{
      type:Number,
      default:0
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    Grade_level: {
      type: String,
      enum: ['Elementary', 'Middle', 'High'],
    },
    Subjects: {
      type: [String],
      validate: [limit, 'Can add maximum 3 subjects'],
    },
  },
  { timestamps: true },
);

const Teacher = mongoose.model('Teacher', TeacherSchema);
module.exports = Teacher;
