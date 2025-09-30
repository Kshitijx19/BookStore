const express = require ("express");
const app = express();

require("dotenv").config();

app.use(express.json()); 

const user=require("./routes/user");
//routes
app.use("/api/v1",user);

require("./conn/conn")

//creating port
app.listen(process.env.PORT,()=>{
    console.log(`Server started at port ${process.env.PORT}`);
});