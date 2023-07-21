const mongoose=require('mongoose');
const movieSchema=mongoose.Schema({
    name:String,
    img:String,
    summary:String
},{
    timestamps:true
});
module.exports=mongoose.model('Movie',movieSchema);