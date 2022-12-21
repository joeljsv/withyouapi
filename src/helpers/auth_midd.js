const jwt = require("jsonwebtoken");
const apiRsposnses = require("../helpers/apiResponse");


const config = process.env;

exports.verifyTokenUser = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"].split(" ")[1] || req.headers["Authorization"].split(" ")[1];

  if (!token) {
    return apiRsposnses.errorResponse(res, "Access Denied");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded.id;
    console.log(req.user);
    
  } catch (err) {
    console.log(err);
    return apiRsposnses.errorResponse(res, "Invalid Token");
  }
  return next();
};
exports.verifyTokenDoctor = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["authorization"].split(" ")[1];
  
    if (!token) {
      return apiRsposnses.errorResponse(res, "Access Denied");
    }
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      if(decoded.role === "1"){
      req.user = decoded;
      }
        else{
            return apiRsposnses.errorResponse(res, "Access Denied");
            }
    } catch (err) {
      return apiRsposnses.errorResponse(res, "Invalid Token");
    }
    return next();
  };
// admin
exports.verifyTokenAdmin = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["authorization"].split(" ")[1];
    
    if (!token) {
        return apiRsposnses.errorResponse(res, "Access Denied");
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        if(decoded.role === "2"){
        req.user = decoded;

        }
        else{
            return apiRsposnses.errorResponse(res, "Access Denied");
            }
    } catch (err) {
        return apiRsposnses.errorResponse(res, "Invalid Token");
    }
    return next();
};
