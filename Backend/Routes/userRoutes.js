import express from "express";
import multer from 'multer';
import path from 'path';
import { registerUser, loginUser, logoutUser } from "../controllers/registerUser.js";
import { resume, applyJob } from '../controllers/uploadResume.js'
import { appliedJobs, revokeApplications } from "../controllers/appliedJobs.js";
import { getProfile, editProfile,addExperince, addEducation } from '../controllers/userProfile.js';


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/resumes");
  },
  filename: function (req, file, cb) {
    return cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage });

router
  .route("/")
  .post(registerUser);

router
  .route("/login")
  .post(loginUser);

router
  .route("/logout")
  .post(logoutUser);

router
  .route("/resume")
  .post(upload.single('file'), resume, applyJob)
  
router
  .route("/applied/:id")
  .get(appliedJobs)
  .post(revokeApplications);

router
  .route("/profile/:id")
  .get(getProfile);

router
  .route("/profile/:id")
  .post(editProfile);

router
  .route("/add-experience/:id")
  .post(addExperince);

router
  .route("/add-education/:id")
  .post(addEducation);


  
export default router;
