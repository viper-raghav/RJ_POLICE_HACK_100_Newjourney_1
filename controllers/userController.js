import userModel from "../models/user.js";
import transporter from "../config/emailConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class userControl {
  static userRegistration = async (req, res) => {
    const { name, email, password, confirmPassword, tc } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user != null) {
      res.send({ status: "error", message: "email already exist" });
    } else {
      if (name && email && password && confirmPassword && tc) {
        if (password === confirmPassword) {
          let doc;
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            doc = new userModel({
              name: name,
              email: email,
              password: hashPassword,
              tc: tc,
            });
            await doc.save();
            const saved_user = await userModel.findOne({ email: email });
            //creating jwt token
            //when the user sends back the token it decrypt the token and match it with id(which is different for every user) and also the signature(which is same for every user)
            const token = jwt.sign(
              { userId: saved_user._id }, //actual token
              process.env.JWT_SECRET_KEY, //secret key is used as a signature on token
              { expiresIn: "5d" }
            );
            res.send({
              status: "success",
              message: "registration success",
              token: token,
            });
          } catch (err) {
            console.log(err);
            res.send({ status: "error", message: "enable to register" });
          }
        } else {
          res.send({ status: "error", message: "password donot match" });
        }
      } else {
        res.send({ status: "error", message: "all fields required" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await userModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            //creating jwt token
            const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "10d" }
            );
            res.send({
              status: "success",
              message: "login success",
              token: token,
            });
          } else {
            res.send({
              status: "error",
              message: "your credentials are wrong",
            });
          }
        } else {
          res.send({
            status: "error",
            message: "your credentials are wrong",
          });
        }
      } else {
        res.send({
          status: "error",
          message: "please enter the required field",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  static changePassword = async (req, res) => {
    const { password, confirmPassword } = req.body;
    if (password && confirmPassword) {
      if (password != confirmPassword) {
        res.send({ status: "error", message: "password do not match" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const new_hashPassword = await bcrypt.hash(password, salt);
        const user = await userModel.findByIdAndUpdate(req.user._id, {
          $set: { password: new_hashPassword },
        });
        res.send({
          status: "sucess",
          message: "password changed successfully",
        });
      }
    } else {
      res.send({ status: "error", message: "enter the required field" });
    }
  };

  static loggedUser = async (req, res) => {
    res.send({ user: req.user });
  };

  static forgetPassword_email = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await userModel.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userId: user._id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://localhost:3000/api/user/reset/${user._id}/${token}`; //this link will be sent to email and on clicking the link we get forwaded to the page where we can reset our password
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "click da link to reset the password",
          html: `<a href=${link}>click da damm link</a>`,
        });
        res.send({
          status: "success",
          message: "password send successfully to your email",
          info: info,
        });
        try {
        } catch (err) {
          res.send({ status: "error", message: "error" });
        }
      } else {
        res.send({ status: "error", message: "email not registered" });
      }
    } else {
      res.send({ status: "error", message: "please enter the email" });
    }
  };

  static forgetPassword = async (req, res) => {
    const { newPassword, newConfirm_pass } = req.body;
    const { id, token } = req.params; //params(data) that comes through link
    const user = await userModel.findOne({ _id: id });
    const newSecret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, newSecret);
      if (newPassword && newConfirm_pass) {
        if (newPassword !== newConfirm_pass) {
          res.send({ status: "error", message: "password donot match" });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHash_password = await bcrypt.hash(newPassword, salt);
          await userModel.findByIdAndUpdate(user._id, {
            $set: {
              password: newHash_password,
            },
          });
          res.send({
            status: "success",
            message: "password reset successfully",
          });
        }
      }
    } catch (err) {
      res.send({ status: "error", message: "token invalid" });
    }
  };
}

export default userControl;
