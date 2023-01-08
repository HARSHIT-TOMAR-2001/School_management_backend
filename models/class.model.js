let mongoose = require('mongoose');

const limit = (val) => {
  return val.length <= 3;
};

const ClassSchema = new mongoose.Schema(
  {
    Grade: Number,
    Division: String,
    Grade_level: {
      type: String,
      enum: ['Elementary', 'Middle', 'High'],
    },
    Subjects: {
      type: [String],
      validate: [limit, 'Can add maximum 3 subjects for a class'],
    },
    Timing_half: {
      type: String,
      default: 'first',
      enum: ['first','second'],
    },
    Seats_left: {
      type: Number,
      default: 60,
    },
  },
  { timestamps: true },
);

ClassSchema.index({ Grade: 1, Division: 1 }, { unique: true });
const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;
