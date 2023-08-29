const express=require("express");
const Router=express.Router();
const {register,login,home,signup,cartpage,loginpage,contact,email,otpp, contactus,passworda, emailVerify, verfiyotp, confpassword,logout}=require("../controller/userController");
const { ExpressValidator, check } = require("express-validator");
const auth = require("../middleware/userMiddleware");





Router.post("/signup",[
    check('name').isLength({min:3}).withMessage(),
    check("email").isEmail().withMessage(),
    check("password").isStrongPassword().withMessage(),
    check("phone").isMobilePhone().withMessage(),
],register)
Router.get("/login",login);
Router.post("/login",loginpage);
Router.get("/homePage",auth,home);
Router.get("/logout",logout);
Router.get("/signup",signup);
Router.get("/cartpage",cartpage);
Router.get("/contact",auth,contact);
Router.post("/contact",auth,contactus);
Router.get("/email",email);
Router.post("/email",emailVerify);
Router.get("/otp",otpp);
Router.post("/otp",verfiyotp);
Router.get("/password",passworda)
Router.post("/password", confpassword);















module.exports=Router