const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Wallet",{
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connecttion established");
}).catch((err)=>{
  console.log(err);
})