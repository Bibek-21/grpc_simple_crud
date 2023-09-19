const express = require('express');
const dotenv= require('dotenv')
const grpc = require('@grpc/grpc-js')
const db= require('./helper/mongoDb')
const protoLoader= require('@grpc/proto-loader')
dotenv.config()
app=  express();

// const filepath = __dirname;
// const testPath = require('./Proto/simpleCrud.rpc')
// const protoPath = `${filepath}/${testPath}`
const packageDefinition = protoLoader.loadSync(process.env.PROTOPATH, {
    keepCase: true,
    longs: 'string',
    defaults: true,
  })

app.use(express.json())
const server= new grpc.Server()


const simpleProto = grpc.loadPackageDefinition(packageDefinition)

const simpleServiceA = require('./controllers/index');

server.addService(simpleProto.example.simpleCrud.rpc.simpleCrudService.service,{
    create:simpleServiceA.createStudents,
    read:simpleServiceA.readStudents,
    readAll:simpleServiceA.readAllStudents,
    update:simpleServiceA.updateStudents,
    delete:simpleServiceA.deleteStudents
})

const port = process.env.PORT;
server.bindAsync(
    `${process.env.GRPC_HOST}:${port}`,
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
