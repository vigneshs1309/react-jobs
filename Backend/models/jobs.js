import mongoose from "mongoose"

const jobSchema = new mongoose.Schema({
  recruiterid: String,
  title: String,
  type: String,
  description: String,
  location:String,
  salary:String,
  company:{
    name:String,
    description:String,
    contactEmail:String,
    contactPhone:String
  }
})

const jobModel = mongoose.model("reactjobs",jobSchema)
export default jobModel