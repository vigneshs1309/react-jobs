import mongoose from "mongoose";

const jobApplicationSchema = mongoose.Schema({
  jobid: {
    type:String,
  },
  seekerid: {
    type: String,
  },
  recruiterid: {
    type: String,
  },
  resume: {
    type: String
  }
},
  {
    timestamps:true
  }
)

const jobApplicationModel = mongoose.model("jobapplications", jobApplicationSchema);

export default jobApplicationModel;