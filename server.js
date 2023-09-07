const express = require('express');
const dotenv= require('dotenv')
const grpc = require('@grpc/grpc-js')
const db= require('./helper/mongoDb')
const protoLoader= require('@grpc/proto-loader')
dotenv.config()
app=  express();

const packageDefinition = protoLoader.loadSync('./proto/simpleCrud.rpc.proto', {
    keepCase: true,
    longs: 'string',
    defaults: true,
  })


const server= new grpc.Server()


const simpleProto = grpc.loadPackageDefinition(packageDefinition)

const simpleServiceA = require('./controllers/index');

server.addService(simpleProto.example.simpleCrud.rpc.simpleCrudService.service,{
    create:simpleServiceA.createStudents,
})
server.bindAsync(
    process.env.GRPC_HOST,
    grpc.ServerCredentials.createInsecure(),
    (err,port) => {
      if (err) {
        console.error(`Server error: ${err.message}`);
      } else {
        console.log(`Server bound on port: ${port}`);
        server.start();
      }
    }
  );



