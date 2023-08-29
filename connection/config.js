const mongoose=require("mongoose")

const dbconn=async()=>{
    let uri="mongodb+srv://ankush:ankush123@cluster0.o5rvguv.mongodb.net/project1?retryWrites=true&w=majority"
   try{
     await mongoose.connect(uri,{});
  console.log("db conncted...")

   }catch(error){
    console.log(error)
   }
}

module.exports={
    dbconn
}

