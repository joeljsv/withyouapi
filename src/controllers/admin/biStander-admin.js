const User = require("../../models/user");
const Campaign = require("../../models/campaign");
const BiStander = require("../../models/biStander");
const campaignController = require("../campaign");
const bistanderController = require("../biStander");
const apiRsposnses = require("../../helpers/apiResponse");


// show all details of a biStander by id
exports.showBiStanderDetails = async (req, res) => {
    try {
        // get biStander id from params
        let { biStanderId } = req.params;
        // get biStander from db by id
        let biStander = await BiStander.findById(biStanderId)   
            .populate("userId");
        // check if biStander is not null
        if (biStander) {
            // render biStander details page
            // map all biStander details to a object to pass to view
            biStander = biStanderMapObject(biStander)
            console.log(biStander)
            res.render("admin/biStander-deatils", {
                biStander: biStander,
            });
        }
        else {
            return apiRsposnses.errorResponse(res, "biStander not found");
        }
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
};
// biStanders  approval reject and complete
exports.approveBiStander = async (req, res) => {
    try {
        // get biStander id from params
        let { biStanderId } = req.params;
        // get biStander from db by id
        let biStander = await bistanderController.verifyBiStander(biStanderId);
        biStander = biStanderMapObject(biStander)
        res.redirect('back');
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
}
// reject biStander by id
exports.rejectBiStander = async (req, res) => {
    try {
        // get biStander id from params
        let { biStanderId } = req.params;
        // get biStander from db by id
        let biStander = await bistanderController.rejectBiStanderRequest(biStanderId);
        biStander = biStanderMapObject(biStander)
        console.log(biStander)
        res.redirect('back');
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
}
// complete biStander by id
exports.completeBiStander = async (req, res) => {
    try {
        // get biStander id from params
        let { biStanderId } = req.params;
        // get biStander from db by id
        let biStander = await bistanderController.markBiStanderAsCompleted(biStanderId);
        biStander = biStanderMapObject(biStander)
        res.redirect('back');
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
}

// incomplete biStander by id
exports.incompleteBiStander = async (req, res) => {
    try {
        // get biStander id from params
        let { biStanderId } = req.params;
        // get biStander from db by id
        let biStander = await bistanderController.markBiStanderAsIncomplete(biStanderId);
        biStander = biStanderMapObject(biStander)
        res.redirect('back');
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
}

// map biStander object
function biStanderMapObject(biStander) {
    // userId,patientName,patientGender,relatio,causeOfAdmission,admissionDate,admissionTime,expectedDischargeDate,locationAddress,phone,noOfbiStanderReq,joinedUsersCount,joinedUsers,isrjected,isVerified,isExpired,isCompleted,_id,createdAt,updatedAt
    return {
        userId: biStander.userId.name,
        patientName: biStander.patientName,
        patientGender: biStander.patientGender,
        relation: biStander.relation,
        causeOfAdmission: biStander.causeOfAdmission,
        admissionDate: biStander.admissionDate,
        admissionTime: biStander.admissionTime,
        expectedDischargeDate: biStander.expectedDischargeDate,
        locationAddress: biStander.locationAddress,
        phone: biStander.phone,
        noOfbiStanderReq: biStander.noOfbiStanderReq,
        joinedUsersCount: biStander.joinedUsersCount,
        joinedUsers: biStander.joinedUsers,
        isRejected: biStander.isrjected,
        isVerified: biStander.isVerified,
        isExpired: biStander.isExpired,
        isCompleted: biStander.isCompleted,
        id: biStander._id,
        createdAt: biStander.createdAt,
        updatedAt: biStander.updatedAt

}
}

