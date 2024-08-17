import express from "express";
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import dbConnect from "./config/db.js";
import userRoutes from "./Routes/userRoutes.js";
import jobsRoutes from "./Routes/jobsRoute.js"
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import cors from 'cors';
import { protect } from "./middleware/authMiddleware.js";

dbConnect();

const app = express();
app.use(cookieParser());

//Determinig the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public/resumes',express.static(path.join(__dirname,'public','resumes')));
app.use(express.urlencoded());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// app.options("/", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.sendStatus(204);
// })

app.get('/', (req, res) => {
  res.send("Server is Running")
})
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobsRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
