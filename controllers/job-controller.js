const Job = require('../db/models/jobSchema');

module.exports.jobs = async (req, res) => {
  try {
    const { company, title, createdBy } = req.query;

    const query = {};

    if (company) {
      query.company = company;
    }
    if (title) {
      query.title = title;
    }
    if (createdBy) {
      query.createdBy = createdBy;
    }

    const response = await Job.find(query).populate('createdBy');
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
module.exports.jobsbyid = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Job.findById(id).populate('createdBy');
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
module.exports.create = async (req, res) => {
  try {
    const { title, company, description, location, salary } = req.body;

    const userId = req.user.id;

    const newJob = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      createdBy: userId,
    });

    return res.status(200).json({ message: 'Job Created successfully' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports.edit = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { id } = req.params;

    const { title, description, company, location, salary } = req.body;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Not authorized to edit this job' });
    }

    const edit = {};

    if (title) {
      edit.title = title;
    }
    if (description) {
      edit.description = description;
    }
    if (salary) {
      edit.salary = salary;
    }
    if (company) {
      edit.company = company;
    }
    if (location) {
      edit.location = location;
    }
    console.log(edit);

    const response = await Job.findByIdAndUpdate(id, edit, {
      new: true,
    }).populate('createdBy');

    return res.status(200).json({ message: 'edited successfully', response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Not authorized to edit this job' });
    }
    const response = await Job.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
