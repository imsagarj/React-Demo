var mongoose = require('mongoose')
var schema = mongoose.Schema;
const userModel = new schema({
    userName:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    phoneNumber:{type:String},
    address:[{
        city:{type:String},
        village:{type:String},
        state:{type:String},
        country:{type:String}
    }]
})

module.exports = mongoose.model('userSchema',userModel)