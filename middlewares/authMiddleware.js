import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

const auth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      //verifying the token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY); //it returns a object that contain a property named userId
      //finding user from token
      req.user = await userModel.findById(userId).select("-password"); //userId will hold the hold the _id ////we are excluding password even tho we are only accessing the _id due to security purposes
      next();
    } catch (err) {
      res.status(401).send({ status: "error", message: "unauthorized user" });
    }
  }
  if (!token) {
    res.send({ message: "failed", message: "token not found" });
  }
};

export default auth;
