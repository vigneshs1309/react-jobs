import asyncHandler from "express-async-handler";
import userModel from "../models/User.js";
import jobModel from '../models/jobs.js'
import jobApplicationModel from "../models/JobApplication.js";

export const resume = asyncHandler(async (req, res, next) => {

    if (req.file) {
      const resumeResult = await userModel.findByIdAndUpdate(req.body.userId, { resume: req.file.filename }).select('-password')

      if (resumeResult) {
        next();
      } else {
        res.status(500);
        throw new Error("Something went wrong!")
      }  
    }
    else {
      next();
    }
  // await userModel.findByIdAndUpdate(req.body.id, { resume: req.file.filename }).select('-password')
  //   .then(result => res.json(result))
  //   .catch(err => res.json(err))
  
})

export const applyJob = async (req, res) => {

  const recruiter = await jobModel.findById(req.body.jobId).select("recruiterid"); 

  const application = {
    "jobid": req.body.jobId,
    "seekerid": req.body.userId,
    "recruiterid": recruiter.recruiterid,
    "resume": req.file?.filename || req.body.resume
  }

  const jobApplication = await jobApplicationModel.create(application);

  if (jobApplication) { 
    res.json(jobApplication);
  }
}