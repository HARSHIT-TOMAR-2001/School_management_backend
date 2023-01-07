let mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    authToken: String,
    isApproved: {
      type: Boolean,
      default: false,
    },
    ClassId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
    desired_class_grade: Number,
    desired_timing_half: {
      type: String,
      default: 'first',
      enum: ['first','second'],
    },
  },
  { timestamps: true },
);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
