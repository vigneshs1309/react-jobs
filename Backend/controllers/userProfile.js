import userModel from "../models/User.js";
import asyncHandler from "express-async-handler";

const getProfile = asyncHandler(async (req, res) => {
  const profile = await userModel.findById(req.params.id).select({ profile : 1,name:1, _id : 0});

  if (profile) {
    res.json(profile);
  } else {
    throw new Error("No Profile is available")
  }

});

const editProfile = asyncHandler(async (req, res) => {
  const { name, phone, about, location, role, skills } = req.body;

  const updateProfile = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { 
        'name': name,
        'profile.phone': phone,
        'profile.about': about,
        'profile.location': location,
        'profile.role': role,
        'profile.skills': skills
       }
    },
    {new: true}
  )

  if (updateProfile) {
    res.status(200).json(updateProfile);
  } else {
    throw new Error("Some Error is occured");
    }
}) 

const addExperince = asyncHandler(async (req,res) => {
  const experience = req.body;

  const updateExperience = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        'profile.experience': experience
      }
    },
    { new: true }
  ).select({profile:{experience:1}, _id: 0});

  if (updateExperience) {
    res.status(200).json(updateExperience); 
  } else {
    throw new Error("Something Went Wrong")
  }
});

const addEducation = asyncHandler(async (req, res) => {
  
  const education = req.body;

  const updateEducation = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        'profile.education': education
      }
    },
    { new: true}
  ).select({ profile: { education: 1 }, _id: 0 });
  
  if (updateEducation) {
    res.status(200).json(updateEducation);
  } else {
    throw new Error("Something went wrong");
  }
});

export { getProfile, editProfile, addExperince, addEducation }; 