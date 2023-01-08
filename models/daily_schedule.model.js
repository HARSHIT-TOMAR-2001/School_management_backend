let mongoose = require('mongoose');

const limit = (val) => {
  return val.length <= 3;
};

const DailyScheduleSchema = new mongoose.Schema(
  {
    ClassId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Class',
    },
    TeacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      default:null
    },
    Subject: String,
    from_hour: Number,
    from_miniute:{
      type:Number,
      default:0
    },
    to_hour:Number,
    to_miniute:{
      type:Number,
      default:0
    }

  },
  { timestamps: true },
);

const Schedule = mongoose.model('Schedule', DailyScheduleSchema);

module.exports = Schedule;
