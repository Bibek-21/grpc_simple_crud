const bodyParser = require('body-parser');
const express = require('express');
const dotenv= require('dotenv')
const grpc = require('@grpc/grpc-js')
dotenv.config()
app=  express();


const server= new grpc.Server()
// app.use(bodyParser.urlencoded({extended: true}));
// const port = process.env.PORT
// app.listen(port,()=>{
//     console.log(`Server listening to port ${port}`);
// })