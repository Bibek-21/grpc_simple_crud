const db = require("../helper/mongoDb");
const studentsModel = db.students
const httpStatus = require('http-status');

let response = { status: httpStatus.BAD_REQUEST, message: 'Request failed' }
exports.createStudents = async (call, callback) => {

  try {
    let dbResponse = await studentsModel.create(call.request);

    if (dbResponse) {
      response.status = httpStatus.OK;
      response.message = "Create successfully";

    }
    return callback(null, response)

  } catch (error) {
    return callback(error)
  }

}


//this is for finding by CRN
// exports.readStudents= async(call, callback)=>{

//   let details ={FirstName:"",LastName:"",CRN:0,Contact:0,DOB:"",Guardian:"",Address:"",IsDeleted:0,}

// try {

// let [dbResponse] = await studentsModel.find(call.request)


// if(dbResponse){

//  details.FirstName = dbResponse.FirstName;
//  details.LastName = dbResponse.LastName;
//  details.CRN = dbResponse.CRN;
//  details.Contact= dbResponse.Contact;
//  details.DOB = dbResponse.DOB;
//  details.Guardian = dbResponse.Guardian;
//  details.Address=dbResponse.Address;
//  details.IsDeleted=dbResponse.IsDeleted;
// }

// return callback(null, details)
// } 
// catch (error) {
// return callback(error)
// }


// }



exports.readStudents = async (call, callback) => {
  let details = {}
  // let details ={FirstName:"",LastName:"",CRN:0,Contact:0,DOB:"",Guardian:"",Address:"",IsDeleted:0,}

  try {

    let dbResponse = await studentsModel.findById(call.request.id)


    if (dbResponse) {

      details.FirstName = dbResponse.FirstName;
      details.LastName = dbResponse.LastName;
      details.CRN = dbResponse.CRN;
      details.Contact = dbResponse.Contact;
      details.DOB = dbResponse.DOB;
      details.Guardian = dbResponse.Guardian;
      details.Address = dbResponse.Address;
      details.IsDeleted = dbResponse.IsDeleted;
    }

    return callback(null, details)
  }
  catch (error) {
    return callback(error)
  }


}


exports.readAllStudents= async(call,callback)=>{
let readResponse={}
try {
  const dbResponse= await studentsModel.find(call.request)
  if(dbResponse){

    readResponse.data=dbResponse;
  }
  return callback(null,readResponse)
} catch (error) {
  return callback(error)
}

}


exports.updateStudents = async (call, callback) => {
  const id = call.request.id;

  try {

      const dbResponse = await studentsModel.findByIdAndUpdate(id, call.request)

      if (dbResponse) {
        response.message = 'Update is successfull'
        response.status =httpStatus.OK;

      }
      return callback(null, response)
    }

   catch (error) {
    return callback(error)

  }

}

exports.deleteStudents= async(call, callback)=>{
try {
  const dbResponse= await studentsModel.findByIdAndRemove(call.request.id)

if(dbResponse){
  response.message = 'Hard Delete is successfull'
  response.status =httpStatus.OK;

}
return callback(null,response)

} catch (error) {
  return callback(error)
}


}