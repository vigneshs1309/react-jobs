import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import userModel from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.userInfo.userId).select("-password");
      req.roles = decoded.userInfo.roles;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, Invalid token")
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, No token");
  }
});

export {protect}
