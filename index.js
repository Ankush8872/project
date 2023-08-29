console.warn("hello")

const express=require("express");
const app=express();
const mongoose=require("mongoose")
const { dbconn } = require("./connection/config");
const Router = require("./router/userRouter");
const userModel = require("./model/schema");
const hbs=require("hbs")
app.set("views-engine","hbs")       



let path=require("path");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.urlencoded({extended:true}))

app.use(express.static(__dirname));
app.use(express.static("./public/image"));
app.use(express.static("./public/css"));
app.use("/",Router)
app.use(express.json())


let pathViews=path.join(__dirname,"/views");
hbs.registerPartials(pathViews);







app.listen(2023,()=>console.log("start srever 2023"));
dbconn()

module.exports=app