const bodyParser = require('body-parser');
const express = require('express');
const dotenv= require('dotenv')
dotenv.config()
const bodyParser=require(body-parser)
app=  express();

app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server connected to port ${port}`);
})