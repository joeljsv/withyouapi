const User = require("../../models/user");
const Campaign = require("../../models/campaign");
const BiStander = require("../../models/biStander");
const campaignController = require("../campaign");
const bistanderController = require("../biStander");
const apiRsposnses = require("../../helpers/apiResponse");

// show all details of a campaign by id
exports.showCampaignDetails = async (req, res) => {
    try {
        // get campaign id from params
        let { campaignId } = req.params;
        // get campaign from db by id
        let campaign = await Campaign.findById  (campaignId)
            .populate("usersDonated")
            .populate("userId");
        // check if campaign is not null
        if (campaign) {
            // render campaign details page
            // map all campaign details to a object to pass to view
            campaign = campginMapObject(campaign)
            res.render("admin/campgin-deatils", {
                campaign: campaign,
            });
        } else {
            return apiRsposnses.errorResponse(res, "campaign not found");
        }
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
};
// campigns  approval reject and complete
exports.approveCampaign = async (req, res) => {
    try {
        // get campaign id from params
        let { campaignId } = req.params;
        // get campaign from db by id
        let campaign = await campaignController.approveCampaign(campaignId);
        campaign = campginMapObject(campaign)
        res.redirect('back');
        

    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
};
// reject campaign by id
exports.rejectCampaign = async (req, res) => {
    try {
        // get campaign id from params
        let { campaignId } = req.params;
        // get campaign from db by id
        let campaign = await campaignController.rejectCampaign(campaignId);
        campaign = campginMapObject(campaign)
        res.redirect('back');
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
};
// complete campaign by id
exports.completeCampaign = async (req, res) => {
    try {
        // get campaign id from params
        let { campaignId } = req.params;
        // get campaign from db by id
        let campaign = await campaignController.markCampaignCompleted(campaignId);
        campaign = campginMapObject(campaign)
        res.redirect('back');
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
};

// campigns  active inactive and incomplete
// active campaign by id
exports.activeCampaign = async (req, res) => {
    try {
        // get campaign id from params
        let { campaignId } = req.params;
        // get campaign from db by id
        let campaign = await campaignController.markCampaignAsActive(campaignId);
        campaign = campginMapObject(campaign)
        res.redirect('back');
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
};
// inactive campaign by id
exports.inactiveCampaign = async (req, res) => {
    try {
        // get campaign id from params
        let { campaignId } = req.params;
        // get campaign from db by id
        let campaign = await campaignController.markCampaignAsInactive(campaignId);
        campaign = campginMapObject(campaign)

        res.redirect('back');
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
};
// incomplete campaign by id
exports.incompleteCampaign = async (req, res) => {
    try {
        // get campaign id from params
        let { campaignId } = req.params;
        // get campaign from db by id
        let campaign = await campaignController.markCampaignAsIncomplete(campaignId);
        campaign = campginMapObject(campaign)

        res.redirect('back');
    } catch (err) {
        return apiRsposnses.errorResponse(res, err);
    }
};







 // map all campaign details to a object to pass to view function

 campginMapObject = (campaign) => {
    return {
        userId: campaign.userId,
        postedBy: campaign.userId.name,
        title: campaign.title,
        type: campaign.type,
        patientName: campaign.patientName,
        patientAge: campaign.patientAge,
        patientGender: campaign.patientGender,
        patientAdhaar: campaign.patientAdhaar,
        patientRationCardNumber: campaign.patientRationCardNumber,
        patientRationCardType: campaign.patientRationCardType,
        hospitalName: campaign.hospitalName,
        hospitalAddress: campaign.hospitalAddress,
        isGovHospital: campaign.isGovHospital,
        hospitalContact: campaign.hospitalContact,
        homeAddress: campaign.homeAddress,
        phone: campaign.phone,
        relation: campaign.relation,
        description: campaign.description,
        documents: campaign.documents,
        images: campaign.images,
        targetAmount: campaign.targetAmount,
        collectedAmount: campaign.collectedAmount,
        remainingAmount: campaign.remainingAmount,
        upiID: campaign.upiID,
        dueDate: campaign.dueDate,
        isActive: campaign.isActive,
        isApproved: campaign.isApproved,
        isRejected: campaign.isRejected,
        isCompleted: campaign.isCompleted,
        noOfUserDonated: campaign.noOfUserDonated,
        usersDonated: campaign.usersDonated,
        isInProgress: campaign.isInProgress,
        _id: campaign._id,
        createdAt: campaign.createdAt,
        updatedAt: campaign.updatedAt,
    };
};