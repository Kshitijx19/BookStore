const express = require ("express");
const app = express();

require("dotenv").config();
require("./conn/conn");

app.use(express.json()); 

const User=require("./routes/user");
const Books=require("./routes/book");   
const Favorites=require("./routes/favourite");
const Cart=require("./routes/cart");
const Order=require("./routes/order");
const cors = require("cors");
app.use(cors()); // Enable CORS for all routes

//routes
app.use("/api/v1",User);
app.use("/api/v1",Books);
app.use("/api/v1",Favorites);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);


//creating port
app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`);
});