const mongoose = require('mongoose');

const Schema= mongoose.Schema;

const projectShema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    filePath:{
        type:String,
        required:true,
    },
    fileName:{
        type:String,
        required:true
    }
})


module.exports=mongoose.model('Projects',projectShema);