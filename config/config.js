"use stricts";

(()=>{
    const dotenv = require('dotenv')
    dotenv.config();
module.exports={
    uri:process.env.MONGODB_URL

}
})();