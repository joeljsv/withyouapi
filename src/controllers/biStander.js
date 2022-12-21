const apiRsposnses = require("../helpers/apiResponse");
const User = require("../models/user");
const BiStander = require("../models/biStander");


// create biStander
exports.createBiStander = async(req, res) => {
    try{
        // get all biStander feilds from body
        let{patientName,patientGender,relation,causeOfAdmission,admissionDate,admissionTime,expectedDischargeDate,lat,
            long,locationAddress,phone,noOfbiStanderReq,} = req.body;  
        // create new biStander
        let biStander = new BiStander({
            userId:req.user,
            patientName:patientName,
            patientGender:patientGender,
            relation:relation,
            causeOfAdmission:causeOfAdmission,
            admissionDate:admissionDate,
            admissionTime:admissionTime,
            expectedDischargeDate:expectedDischargeDate,
            location: {
                lat:lat,
                long:long
              },
            locationAddress:locationAddress,
            phone:phone,
            noOfbiStanderReq:noOfbiStanderReq,

        });
        biStander = await biStander.save();
        return apiRsposnses.successResponseWithData(res, "biStander created", biStander);
    }catch(err){
        return apiRsposnses.errorResponse(res, err);  
    }
}
// update biStander joinedUsers list 
exports.joinBiStander = async(req, res) => {
        try{
            // get userId from body
            let{biStanderCampaginId} = req.body;
            let userId = req.user;
            // get biStander from db by id
            let biStander = await BiStander.findById(biStanderCampaginId).populate("userId").populate("joinedUsers");
            // check if biStander is not null
            if(biStander){
                // check if user is already joined
                if(biStander.joinedUsers.includes(userId)){
                    return apiRsposnses.successResponseWithData(res, "user already joined", biStander);
                }else{
                    // add user to joinedUsers list
                    biStander.joinedUsers.push(userId);
                    // increment joinedUsersCount
                    biStander.joinedUsersCount = biStander.joinedUsersCount + 1;
                    // update noOfbiStanderReq
                    // check if noOfbiStanderReq is 0
                    if((biStander.noOfbiStanderReq- biStander.joinedUsersCount )<1){
                        // set isCompleted to true
                        biStander.isExpired = true;
                    }
                    let user = await User.findById(userId);
                user.joinedBiStander.push(biStanderCampaginId);
                    // 
                    // save biStander to db
                    biStander = await biStander.save();
                    return apiRsposnses.successResponseWithData(res, "Succesfully Removed", biStander);
                }
            }else{
                return apiRsposnses.errorResponse(res, "biStander not found");
            }
        }catch(err){
            return apiRsposnses.errorResponse(res, err);

        }
        }

        // verify biStander
exports.verifyBiStander = async(biStanderCampaginId) => {
    try{
        // get biStander from db by id
        let biStander = await BiStander.findById(biStanderCampaginId);
        // check if biStander is not null
        if(biStander){

            // verify biStander
            biStander.isVerified = true;
            biStander.isExpired = false;
            biStander.isrjected = false;

            // save biStander to db
            biStander = await biStander.save();
            return biStander;
        }else{
            return apiRsposnses.errorResponse(res, "biStander not found");
        }
    }catch(err){
        return apiRsposnses.errorResponse(res, err);
    }
}

// get verified biStanders
exports.    getVerifiedBiStanders = async(req, res) => {
    try{
        // get biStanders from db
        let biStanders = await BiStander.find({isVerified:true,});
        // check if biStanders is not null
        if(biStanders){
            return biStanders;
        }else{
            return [];
        }
    }catch(err){
        return apiRsposnses.errorResponse(res, err);
    }
}

// get unverified biStanders
exports.getUnverifiedBiStanders = async(req, res) => {
    try{
        // get biStanders from db
        let biStanders = await BiStander.find({isVerified:false});
        // check if biStanders is not null
        if(biStanders){
            return apiRsposnses.successResponseWithData(res, "unverified biStanders", biStanders);
        }else{
            return apiRsposnses.errorResponse(res, "no biStanders found");
        }
    }catch(err){
        return apiRsposnses.errorResponse(res, err);
    }
}
// get biStander by id populated with joinedUsers
exports.getBiStanderById = async(req, res) => {
    try{
        // get biStander id from params
        let{biStanderCampaginId} = req.params;
        // get biStander from db by id
        let biStander = await BiStander.findById(biStanderCampaginId).populate("joinedUsers");
        // check if biStander is not null
        if(biStander){
            return apiRsposnses.successResponseWithData(res, "biStander", biStander);
        }else{
            return apiRsposnses.errorResponse(res, "biStander not found");
        }
    }catch(err){
        return apiRsposnses.errorResponse(res, err);
    }
}
// expire biStander
exports.expireBiStander = async(req, res) => {
    try{
        // get biStander id from body
        let{biStanderCampaginId} = req.body;
        // get biStander from db by id
        let biStander = await BiStander.findById(biStanderCampaginId);
        // check if biStander is not null
        if(biStander){
            // expire biStander
            biStander.isExpired = true;
            // save biStander to db
            biStander = await biStander.save();
            return apiRsposnses.successResponseWithData(res, "biStander expired", biStander);
        }else{
            return apiRsposnses.errorResponse(res, "biStander not found");
        }
    }catch(err){
        return apiRsposnses.errorResponse(res, err);
    }
}
// get all biStanders
exports.getAllBiStanders = async(req, res) => {
    try{
        // get biStanders from db
        let biStanders = await BiStander.find();
        // check if biStanders is not null
        if(biStanders){
            return apiRsposnses.successResponseWithData(res, "biStanders", biStanders);
        }else{
            return apiRsposnses.errorResponse(res, "no biStanders found");
        }
    }catch(err){
        console.log(err);
        return apiRsposnses.errorResponse(res, err);
    }
}
// remove biStander user
exports.removeBiStanderUser = async(req, res) => {
    try{
        // get biStander id from body
        let{biStanderCampaginId} = req.body;
        let userId= req.user;
        // get biStander from db by id
        let biStander = await BiStander.findById(biStanderCampaginId);
        // check if biStander is not null
        if(biStander){
            // check if user is already joined
            if(biStander.joinedUsers.includes(userId)){
                // remove user from joinedUsers list
                biStander.joinedUsers = biStander.joinedUsers.filter(user => user != userId);
                // decrement joinedUsersCount
                biStander.joinedUsersCount--;
                biStander.isExpired=false;
                // remove biStander from user biStanders list
                let user = await User.findById(userId);
                user.joinedBiStander = user.joinedBiStander.filter(biStander => biStander != biStanderCampaginId);
                // save user to db
                user = await user.save();
                // save biStander to db
                biStander = await biStander.save();
                return apiRsposnses.successResponseWithData(res, "user removed", biStander);
            }else{
                return apiRsposnses.errorResponse(res, "user not joined");
            }
        }else{
            return apiRsposnses.errorResponse(res, "biStander not found");
        }
    }catch(err){
        console.log(err);
        return apiRsposnses.errorResponse(res, err);
    }
}
// get verified and unexpired biStanders
exports.getVerifiedAndUnexpiredBiStanders = async(req, res) => {
    try{
        // get biStanders from db
        let biStanders = await BiStander.find({isVerified:true, isExpired:false}).populate("userId").populate("joinedUsers");
        // check if biStanders is not null
        if(biStanders){
            return apiRsposnses.successResponseWithData(res, "verified and unexpired biStanders", biStanders);
        }else{
            return apiRsposnses.errorResponse(res, "no biStanders found");
        }
    }catch(err){
        return apiRsposnses.errorResponse(res, err);
    }
}


// new biStander request
exports.newBiStanderRequest = async(req, res) => {
    try {
        // get all new campaigns
        let campaigns = await BiStander.find({ isCompleted: false,isrjected:false,isVerified:false,isExpired:false }).populate("userId");
        return campaigns;
      } catch (err) {
        return apiRsposnses.errorResponse(res, err);
      }
    }
// 
// reject biStander request
exports.rejectBiStanderRequest = async(biStanderId) => {
    try {
        // get biStander id from params
        // get biStander from db by id
        let biStander = await BiStander.findById(biStanderId);
        // check if biStander is not null
        if (biStander) {
            // reject biStander
            biStander.isrjected = true;
            biStander.isVerified = false;
            biStander.isCompleted = false;
            // save biStander to db
            biStander = await biStander.save();
            return biStander;
            }
        else {
            return apiRsposnses.errorResponse(res, "biStander not found");
        }
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
}
// mark biStander as completed
exports.markBiStanderAsCompleted = async(biStanderId) => {
    try {
        // get biStander id from params
        // get biStander from db by id
        let biStander = await BiStander.findById(biStanderId);
        // check if biStander is not null
        if (biStander) {
            // mark biStander as completed
            biStander.isCompleted = true;
            biStander.isExpired = true;
            // save biStander to db
            biStander = await biStander.save();
            return biStander;
            }
        else {
            return apiRsposnses.errorResponse(res, "biStander not found");
        }
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
}
// mark biStander as incomplete
exports.markBiStanderAsIncomplete = async(biStanderId) => {
    try {
        // get biStander from db by id
        let biStander = await BiStander.findById(biStanderId);
        // check if biStander is not null
        if (biStander) {
            // mark biStander as incomplete
            biStander.isCompleted = false;
            biStander.isExpired = false;
            // save biStander to db
            biStander = await biStander.save();
            return biStander;   
            }
        else {
            return apiRsposnses.errorResponse(res, "biStander not found");
        }
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
}
// rejected biStander request
exports.rejectedBiStanderRequest = async(req, res) => {
    try {
        // get all rejected campaigns
        let campaigns = await BiStander.find({ isrjected:true}).populate("userId");
        return campaigns;
      } catch (err) {
        return apiRsposnses.errorResponse(res, err);
      }
    }
//

