import express from "express";
import userControl from "../controllers/userController.js";
import auth from "../middlewares/authMiddleware.js";
const router = express.Router();

//public router
router.post("/register", userControl.userRegistration);
router.post("/login", userControl.userLogin);
router.post("/forgetPassword", userControl.forgetPassword_email);
router.post("/resetPassword/:id/:token", userControl.forgetPassword); //after we click on the send button by typing new password and confirm password this url opens

//private route
router.post("/changePassword", auth, userControl.changePassword);
router.get("/loggedUser", auth, userControl.loggedUser);
export default router;
