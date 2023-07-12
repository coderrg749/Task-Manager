const mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Task', taskSchema);