import userModel from "../models/User.js";
import jobApplicationModel from "../models/JobApplication.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

// @desc  Register new User
// POST   api/users/
// public
const registerUser = asyncHandler(async (req, res) => { 
  const { name, email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user) {
    res.status(400)
    throw new Error("User already exist");
  }

  const result = await userModel.create({
    name,
    email,
    password,
  });

  if (result) {
    const roles = Object.values(result.roles);
    generateToken(res, result._id,roles);
    res.status(200).json({
      id: result._id,
      name: result.name,
      email: result.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc Login a user
// POST  api/users/login
// public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const roles = Object.values(user.roles);
    const token = generateToken(res, user._id,roles);
    
    const applied = await jobApplicationModel.find({
          $or: [
            { seekerid: user._id },
            { recruiterid: user._id }
          ]
      }).select('jobid');

    const appliedJobs = applied.map(job => job.jobid);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      resume:user.resume,
      roles,
      appliedJobs,
    })
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password")
  } 
  
});

// @desc  Logout User
// POST   api/users/logout
// Public
const logoutUser = asyncHandler(async (req, res) => {
  
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict'
  })

  res.status(200).json({
    "message":"user logged out"
  })
})

export { registerUser, loginUser, logoutUser };
