import jobApplicationModel from "../models/JobApplication.js";
import jobModel from "../models/jobs.js";

export const appliedJobs = async(req, res) => {
  const applied = await jobApplicationModel.find({
    $or: [
      { seekerid: req.params.id },
      { recruiterid: req.params.id }
    ]
  }).select('jobid');

  const appliedJobs = applied.map(job => job.jobid);

  const jobs = await jobModel.find({
    _id: { $in: appliedJobs }
  })
  
  res.json(jobs);
}

export const revokeApplications = async (req, res) => {
  try {
    const revoke = await jobApplicationModel.deleteOne({
      $and: [
        { jobid: req.body.jobId },
        { seekerid: req.body.userId }
      ]
    });
    res.json(revoke);
  } catch (error) {
    res.json(error);
  }
}