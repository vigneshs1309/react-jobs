import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB database${conn.connection.host}`)
  } catch (error) {
    console.log(`Error:${error}`);
    process.exit(1);
  }
} 

export default dbConnect