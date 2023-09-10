const db = require("../helper/mongoDb");
const studentsModel= db.students 
const httpStatus = require('http-status');

let response = { status:httpStatus.BAD_REQUEST,message:'Request failed'}
let details ={}
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

 details.FirstName = dbResponse.FirstName;
 details.LastName = dbResponse.LastName;
 details.CRN = dbResponse.CRN;
 details.Contact= dbResponse.Contact;
 details.DOB = dbResponse.DOB;
 details.Guardian = dbResponse.Guardian;
 details.Address=dbResponse.Address;
 details.IsDeleted=dbResponse.IsDeleted;
}
return callback(null, response)
} 
catch (error) {
return callback(error)
}


}


