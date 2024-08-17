import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { type } from "os";

const experienceSchema = mongoose.Schema({
  job: String,
  company: String,
  description: String
});

const educationSchema = mongoose.Schema({
  institution: String,
  duration: String
})

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      Seeker: {
        type: Number,
        default: 1234,
      },
      Recruiter: Number
    },
    resume: {
      type: String,
    },
    profile: {
      phone: Number,
      about: String, 
      location: String,
      role: String,
      skills: [String],
      experience: [experienceSchema],
      education: [educationSchema]
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

const userModel = mongoose.model("users", userSchema);
export default userModel;
