const mongoose = require("mongoose");


const AddressSchema = new mongoose.Schema({
   address :{
        type : String,
        required : true,
        
    },

    privateKey:{
        type : String,
        required : true,
       
    }

})


// Creating a new collection 

const wallet = new mongoose.model('WALLET', AddressSchema);
module.exports = wallet;