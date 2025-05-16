const Application = require('../db/models/applicationSchema');
const Job = require('../db/models/jobSchema');

module.exports.apply = async (req, res) => {
  try {
    const applicantId = req.user?.id;

    const { jobId, coverletter } = req.body;

    if (!jobId || !coverletter) {
      return res
        .status(400)
        .json({ message: 'Job ID and cover letter are required.' });
    }

    const existingApplication = await Application.findOne({
      jobId,
      applicantId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: 'You have already applied for this job.' });
    }

    const application = await Application.create({
      jobId,
      applicantId,
      coverletter,
    });
    return res
      .status(200)
      .json({ message: 'Application submitted successfully.', application });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.userApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ applicantId: userId })
      .populate('jobId')
      .populate('applicantId', '-password');

    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.creatorApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const userJobs = await Job.find({ createdBy: userId }).select('_id');
    const jobIds = userJobs.map(job => job._id);

    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate('jobId')
      .populate('applicantId', '-password');

    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
