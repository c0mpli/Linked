const mongoose =require("mongoose");
var dataSchema= new mongoose.Schema({
    user:{
        type:String,
        required:true,
        unique:true
    },
    emoji:{
        type:String,
        default:""
    },
    
    status:{
        type:String,
        default:""
    },

});

const Data = mongoose.model("Data", dataSchema);

module.exports = Data;