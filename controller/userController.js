const { ExpressValidator, validationResult } = require("express-validator");
const userModel = require("../model/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();








const signup = async (req, res) => {
    res.render("signup.hbs")
}

//register data in database & validation ,bcrypt password
let data;
let register = async (req, res) => {
    try {



        let { name, email, password, phone } = req.body;
        let salt = bcrypt.genSaltSync(10);
        let hashpass = bcrypt.hashSync(password, salt);
        data = {
            name: name,
            email: email,
            phone: phone,
            password: hashpass
        }
        const errors = validationResult(req);
        const err = errors.array()

        for (var i = 0; i < err.length; i++) {
            if (err[i].path === 'name') {
                res.render("signup.hbs", { name: "name short" })
            }
            else if (err[i].path === 'email') {
                res.render("signup.hbs", { email: "email not valid" })
            }
            else if (err[i].path === 'mobile') {
                res.render("signup.hbs", { phone: "mobile not valid" })
            }
            else if (err[i].path === 'password') {
                res.render("signup.hbs", { password: "Enter a secure password: At least 8 characters long, containing uppercase and lowercase letters and numbers." })
            }

        }

        let find = await userModel.findOne({ email: req.body.email });
        if (find) {
            return res.render("signup.hbs", { message1: "user already exist" });
        }
        else {
            let { password, confirmpassword } = req.body;
            if (password !== confirmpassword) {
                res.render("signup.hbs", { messagez: " error:confirm password not match" });
            } else {
                let result = await userModel.create(data);
                if (result) {
                    res.render("login.hbs", { message: "signup succssfull" });

                }
            }

        }

    } catch (error) {
        res.render(error)
    }
}
//////////// end//////////////






//login data api & campare bcrypt password and jwt token create 
const login = (req, res) => {

    res.render("login.hbs");
}

const loginpage = async (req, res) => {
    try {
        let { email, password } = req.body;
        let find = await userModel.findOne({ email: email });
        if(!find) return res.render("login.hbs",{message:"Invalid details"});

       let compare=bcrypt.compareSync(password,find.password);
       let newdata={name:find.name,email:find.email,phone:find.phone}
       if(!compare) return res.render("login.hbs",{message:"incorrect email or password"})

       jwt.sign(newdata,process.env.secretkey,(err,token)=>{
        if(err) return res.render("login.hbs",{message:err.message});
        res.cookie("jwtToken",token)
        res.render("home.hbs",{messageank:find.name})
     
    })
    } catch (error) {
        res.render("",{message:error} );
    }
}
////////////end/////////////

//home page render//////


const home = (req, res) => {
    res.render("home.hbs")
}

//cartpage render//
const cartpage = (req, res) => {
    res.render("cartpage.hbs")
}
// contact page render///
const contact = (req, res) => {
    res.render("contactus.hbs");
}

// contact us page api with nodemailer/////
const nodemailer = require("nodemailer");
const contactus = async (req, res) => {
    try {
        let { name, email, message } = req.body;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ankushankush4520@gmail.com',
                pass: 'itpywftbnvoalxgr'
            }
        });

        var mailOptions = {
            to: "ankushankush4520@gmail.com",
            from: req.body.email,
            name: req.body.name,
            subject: req.body.subject,
            text: req.body.message

        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.render("contactus.hbs", { message: error });

                console.log(error);
            } else {
                res.render("contactus.hbs", { message: "Thanks for your Feedback..." });
            }
        });


    } catch (error) {
        res.send(error)
    }

}
/////////////////end///////////////


const email = (req, res) => {
    res.render("email.hbs")
}
let otp;
let find;
const emailVerify = async (req, res) => {
    try {
        let { email } = req.body
        find = await userModel.findOne({ email: req.body.email });
        if (find) {

            // res.render("otp.hbs")
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: "ankushankush4520@gmail.com",
                    pass: 'itpywftbnvoalxgr'
                }
            });
            otp = Math.floor(Math.random() * 7000);
            var mailOptions = {
                to: req.body.email,
                from: "ankushankush@4520@gmail.com",

                subject: "your verify otp",
                text: `your otp to verfiy email is ${otp} `



            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.render("email.hbs", { message: "not sent" });


                } else {
                    res.redirect("otp")
                    res.render("otp.hbs", { message: "enter otp" });
                    console.log(otp);
                }
            });

        }

    } catch (error) {
        res.send(error);
    }
}


const otpp = (req, res) => {
    res.render("otp.hbs");
}
const verfiyotp = async (req, res) => {
    if (otp == req.body.otp) {
        res.render("password.hbs");
    } else {
        res.render("email.hbs", { message: " enter valid otp" });
    }
}

const passworda = (req, res) => {
    res.render("password.hbs");
}

const confpassword = async (req, res) => {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hashpass = bcrypt.hashSync(req.body.password, salt);
        let upp = await userModel.updateOne({ _id: find._id }, {
            $set: {
                password: hashpass

            }
        })
        let { password, confirmpassword } = req.body;
        if (password !== confirmpassword) {
            res.render("password.hbs", { message: "please confirm password" })
        } else {
            if (upp) {
                res.render("login.hbs");
            } else {
                res.render("password.hbs");
            }
        }
    } catch (error) {
        res.render(error);
    }
}

// logout post api home 
const logout = async (req, res) => {
    res.clearCookie("jwtToken")
    res.redirect("/homePage")
}




module.exports = {
    home,
    register,
    signup,
    login,
    loginpage,
    cartpage,
    contact,
    contactus,
    confpassword,
    passworda,
    email,
    emailVerify,
    verfiyotp,
    otpp,
    logout
}