const mongoose=require("mongoose");

const order=new mongoose.Schema(
    {
        user:{
            type: mongoose.Types.ObjectId,
            ref:"user",
        },
        book:{
            type: mongoose.Types.ObjectId,
            ref:"user",
        },
        status:{
            type:String,
            default:"Order Placed",
            enum:["oderPlaced","Out fro Delivery,Delivered,Cancelled"],
        },
    },
    {timestamps:true}
);

modeule.exports=mongoose.model("order",order);