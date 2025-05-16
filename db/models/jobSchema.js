const { Schema, model, mongoose } = require('mongoose');

const JobSchema = Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    salary: { type: Number },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Job = model('Job', JobSchema);

module.exports = Job;
