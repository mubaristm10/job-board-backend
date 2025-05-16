const { application } = require('express');
const { Schema, model, mongoose } = require('mongoose');
const ApplicationSchema = Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    coverletter: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Application = model('Application', ApplicationSchema);

module.exports = Application;
