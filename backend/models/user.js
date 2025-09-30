const mongoose = require("mongoose");

//creating schema 
const user=new mongoose.Schema({
    username:{
        type: String,
        required: true, // ie we will not work without username
        unique:true,
    },
    email:{
        type: String,
        required: true, 
        unique:true,
    },
    password:{
        type: String,
        required: true, 
    },
    address:{
        type: String,
        required: true, 
    },
    avatar:{
        type: String,
        default:"https://tse1.mm.bing.net/th/id/OIP.OYHt-j9ZHOUgQJp6uu-rnQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    },
    role:{
        type: String,
        default:"user",
        enum: ["user","admin"],//allowed values
    },
    favorites:[  //making array as it can contain many items
        {
        type:mongoose.Types.ObjectId,
        ref:"books",
        },
    ],
    cart:[
        {
        type:mongoose.Types.ObjectId,
        ref:"books",
        },
    ],
    orders:[
        {
        type:mongoose.Types.ObjectId,
        ref:"order",
        },
    ],
},
{timestamps:true} //sorting the recents on top

);
module.exports=mongoose.model("user",user);