let jwt=require("jsonwebtoken")
require("dotenv").config();

let auth=(req,res,next)=>{
    try{

        if(!req.cookies?.jwtToken) return res.redirect("/login");
        let verifyToken=jwt.verify(req.cookies?.jwtToken,process.env.secretkey);

        if(!verifyToken) return res.redirect("/login");

        switch(req.url){

            case "/homePage": return res.render("home.hbs",{messageank:verifyToken.name});
            break

            case "/contact": return res.render("contactus.hbs",{messageank:verifyToken.name});
            break

            default:return res.redirect("/login");
        }
        next();
    }catch(err){
        return err.message
    }
}

module.exports=auth;