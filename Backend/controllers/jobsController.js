import asyncHandler from 'express-async-handler'
import Jobs from '../models/jobs.js'
import { error } from 'console';

const getJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Jobs.find({});
    const limit = parseInt(req.query.limit,10);
    
    if (!isNaN(limit) || limit > 0) {
      const limitedJobs = jobs.slice(0, limit);
      res.status(200).json({
        "Success": true,
        "data":limitedJobs
      })
    } else {
      res.status(200).json({
        "Success": true,
        "data":jobs
      })
    }

  } catch (error) {
    throw new Error(error);
  }
  
})

const getAJob = asyncHandler(async (req, res) => {
  
  const job = await Jobs.findById(req.params.id);
  if (job) {
    res.status(200).json({
      "Success": true,
      "data": job
    })
  } else {
    res.status(204).json({
      "Success": false,
      "Error": "No Job is found"
    })
  }

})

const createJob = asyncHandler(async (req, res) => {
  
  const job = await Jobs.create(req.body);
  res.status(200).json({
    "Success": true,
    "data": job
  })

})

const updateJob = asyncHandler(async (req, res) => {
  
  const job = await Jobs.findByIdAndUpdate(req.params.id, req.body);
  if (job) {
    res.status(200).json({
      "Success": true,
      "data": job
    })
  } else {
    throw new Error("Job does not exist");
  }
})

const deleteJob = asyncHandler(async (req, res) => {
  
  const job = await Jobs.findByIdAndDelete(req.params.id);
  if (job) {
    res.status(200).json({
      "Success": true,
      "message":"Job removed" 
    })
  } else {
    throw new Error("Job does not exist");  
  }

})

export {getJobs, getAJob, createJob, updateJob, deleteJob}
