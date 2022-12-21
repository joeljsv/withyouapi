const apiRsposnses = require("../helpers/apiResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const fetch = require('node-fetch');
// 0 for user
// 1 for admin
// login user
exports.login = async(req, res) => {
    try{
        //   fetch all users
        let user = await User.findOne({email:req.body.email});
        if(!user){
            return apiRsposnses.errorResponse(res, "User not found");
        }
        if(user.password!=req.body.password){
            return apiRsposnses.errorResponse(res, "Password is incorrect");
        }
        // create token
        const token = jwt.sign({
            id:user._id,
        }, process.env.JWT_SECRET, {expiresIn: "365d"});
       return apiRsposnses.successResponseWithData(res, "userfound", {user,token});
    }
    catch(err){
        return apiRsposnses.errorResponse(res, err);

    }
    }
// signup user
exports.signup = async(req, res) => {
    try{
        // get all feilds from body
        let {name,phone,addresslin1,addresslin2,city,state,pincode,email,password} = req.body;
        // check if user already exists
        let user = await User.findOne({
            email:email
        });
        
        if(user){
            return apiRsposnses.errorResponse(res, "User already exists");
        }
        // create new user
        user = new User({
            name:name,
            phone:phone,
            addresslin1:addresslin1,
            addresslin2:addresslin2,
            city:city,
            state:state,
            pincode:pincode,
            email:email,
            password:password,
            role:0
        });
        // save user
        user = await user.save();
        const token = jwt.sign({
            id:user._id,
            
        }, process.env.JWT_SECRET, {expiresIn: "365d"});
        return apiRsposnses.successResponseWithData(res, "user created", {user,token});



    }catch(err){
        return apiRsposnses.errorResponse(res, err);
    }
}
