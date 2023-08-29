const mongoose=require("mongoose")

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
    email: {
		type: String,
		required: true,
	},
    password: {
		type: String,
		required: true,
	}

	
})

const userModel = mongoose.model("user", userSchema,"user")
module.exports=userModel;