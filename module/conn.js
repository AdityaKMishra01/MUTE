const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/mute").then(()=>{
    console.log("Connection successful")
}).catch((err)=>{
    console.log(err)
})

const userSchema = new mongoose.Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});

const Customer = mongoose.model('Customer',userSchema);

module.exports = Customer;