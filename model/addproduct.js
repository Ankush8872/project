const mongoose=require("mongoose")

const addSchema= new mongoose.Schema({
    product_Name:{
     type:String,
     require:true
    },
    price:{
        type:Number,
        require:true
    },
    discount_price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
     image:{ 
        type:String,
        
    }
})
const addproduct_Model=mongoose.model("product",addSchema,"product");
module.exports=addproduct_Model;