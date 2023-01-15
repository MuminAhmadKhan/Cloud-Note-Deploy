const { default: mongoose } = require("mongoose")
const { Schema } = mongoose;

const noteSchema = new Schema({
   user :{
     type: mongoose.Schema.Types.ObjectId ,
     ref :'user'},
    title :  {
      type : String,
      required : true
    } ,
    description :  {
      type : String,
            
    } ,
    category :  {
      type : String,
      default: 'general'
    } ,
    date :{
      type:Date ,
      default : Date.now
    }
  });
module.exports = mongoose.model('notes',noteSchema);