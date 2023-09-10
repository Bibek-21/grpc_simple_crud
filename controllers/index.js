const db = require("../helper/mongoDb");
const studentsModel= db.students 
const httpStatus = require('http-status');

let response = { status:httpStatus.BAD_REQUEST,message:'Request failed'}

exports.createStudents= async (call,callback)=>{

  try {
    let dbResponse = await studentsModel.create(call.request);

    if(dbResponse){
response.status=httpStatus.OK;
response.message= "Create successfully";

    }
    return callback(null,response)

  } catch (error) {
    return callback(error)
  }

}

exports.readStudents= async(call, callback)=>{


try {

let dbResponse = await studentsModel.findById(call.request)
  

if(dbResponse){

response.status=httpStatus.OK;
response.message= dbResponse.message;
}
return callback(null, response)
} 
catch (error) {
return callback(error)
}


}


