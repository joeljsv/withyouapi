const apiRsposnses = require("../helpers/apiResponse");
const User = require("../models/user");
const Campaign = require("../models/campaign");

// create campaign
exports.createCampaign = async (req, res) => {
  try {
    // parse list of documents from body

    // get all feilds from body for campaign creation
    let {
      title,
      type,
      patientName,
      patientAge,
      patientGender,
      patientAdhaar,
      patientRationCardNumber,
      patientRationCardType,
      hospitalName,
      hospitalAddress,
      isGovHospital,
      hospitalContact,
      homeAddress,
      phone,
      relation,
      description,
      targetAmount,
      upiID,
      dueDate,
    } = req.body;
    // create new campaign
    let campaign = new Campaign({
      userId: req.user,
      title: title,
      type: type,
      patientName: patientName,
      patientAge: patientAge,
      patientGender: patientGender,
      patientAdhaar: patientAdhaar,
      patientRationCardNumber: patientRationCardNumber,
      patientRationCardType: patientRationCardType,
      hospitalName: hospitalName,
      hospitalAddress: hospitalAddress,
      isGovHospital: isGovHospital,
      hospitalContact: hospitalContact,
      homeAddress: homeAddress,
      phone: phone,
      relation: relation,
      description: description,
      documents: req.doc,
      images: req.imag,
      targetAmount: targetAmount,
      upiID: upiID,
      dueDate: dueDate,
      remainingAmount: targetAmount,
    });

    campaign = await campaign.save();
    return apiRsposnses.successResponseWithData(
      res,
      "campaign created",
      campaign
    );
  } catch (err) {
    return apiRsposnses.errorResponse(res, err);
  }
};

// get all approved campaigns
exports.getAllApprovedCampaigns = async (req, res) => {
  try {
    // get all approved campaigns
    let campaigns = await Campaign.find({ isApproved: true });
    return campaigns;
  } catch (err) {
    return apiRsposnses.errorResponse(res, err);
  }
};
// approve campaign by id
exports.approveCampaign = async (campaignId) => {
  try {
    // get campaign id from params
    // get campaign from db by id
    let campaign = await Campaign.findById(campaignId);
    // check if campaign is not null
    if (campaign) {
      // set isApproved to true
      campaign.isApproved = true;
      campaign.isRejected = false;
      campaign.isActive = true;
      campaign.isCompleted = false;
      campaign.isInProgress = true;
      // save campaign to db
      campaign = await campaign.save();
      // redirect to all approved campai
      return campaign;
    } else {
      throw err;
    }
  } catch (err) {
    throw err;
  }
};
// reject campaign by id
exports.rejectCampaign = async (campaignId) => {
  try {
    // get campaign from db by id
    let campaign = await Campaign.findById(campaignId);
    // check if campaign is not null
    if (campaign) {
      // set isRejected to true
      campaign.isRejected = true;
      campaign.isApproved = false;
      campaign.isActive = false;
      campaign.isCompleted = false;
      campaign.isInProgress = false;
      // save campaign to db
      campaign = await campaign.save();
      return campaign;
    } else {
      throw Error("campaign not found");
    }
  } catch (err) {
    throw err;
  }
};
// get all rejected campaigns
exports.getAllRejectedCampaigns = async (req, res) => {
  try {
    // get all rejected campaigns
    let campaigns = await Campaign.find({ isRejected: true });
    return campaigns;
  } catch (err) {
    return apiRsposnses.errorResponse(res, err);
  }
};
// get all active campaigns
exports.getAllActiveCampaigns = async (req, res) => {
  try {
    // get all active campaigns
    let campaigns = await Campaign.find({
      isActive: true,
      isApproved: true,
    }).populate("userId");
    return apiRsposnses.successResponseWithData(
      res,
      "all active campaigns",
      campaigns
    );
  } catch (err) {
    return apiRsposnses.errorResponse(res, err);
  }
};
// get all inactive campaigns
exports.getAllInactiveCampaigns = async (req, res) => {
  try {
    // get all inactive campaigns
    let campaigns = await Campaign.find({ isActive: false });
    return apiRsposnses.successResponseWithData(
      res,
      "all inactive campaigns",
      campaigns
    );
  } catch (err) {
    return apiRsposnses.errorResponse(res, err);
  }
};
// get all completed campaigns
exports.getAllCompletedCampaigns = async (req, res) => {
  try {
    // get all completed campaigns
    let campaigns = await Campaign.find({ isCompleted: true });
    return apiRsposnses.successResponseWithData(
      res,
      "all completed campaigns",
      campaigns
    );
  } catch (err) {
    return apiRsposnses.errorResponse(res, err);
  }
};
// get all in progress campaigns
exports.getAllInProgressCampaigns = async (req, res) => {
  try {
    // get all in progress campaigns
    let campaigns = await Campaign.find({ isInProgress: true });
    return apiRsposnses.successResponseWithData(
      res,
      "all in progress campaigns",
      campaigns
    );
  } catch (err) {
    return apiRsposnses.errorResponse(res, err);
  }
};
// get all campaigns
exports.getAllCampaigns = async (req, res) => {
  try {
    // get all campaigns
    let campaigns = await Campaign.find();
    return apiRsposnses.successResponseWithData(
      res,
      "all campaigns",
      campaigns
    );
  } catch (err) {
    return apiRsposnses.errorResponse(res, err);
  }
};
// get campaign by id
exports.getCampaignById = async (req, res) => {
  try {
    // get campaign id from body
    let { campaignId } = req.body;
    // get campaign from db by id
    let campaign = await Campaign.findById(campaignId)
      .populate("usersDonated")
      .populate("userId");
    // check if campaign is not null
    if (campaign) {
      return apiRsposnses.successResponseWithData(
        res,
        "campaign found",
        campaign
      );
    } else {
      return apiRsposnses.errorResponse(res, "campaign not found");
    }
  } catch (err) {
    return apiRsposnses.errorResponse(res, err);
  }
};
// get list of campaigns by user id
exports.getCampaignsByUserId = async (req, res) => {
  try {
    // get user id from body
    let  userId = req.user;
    // get all campaigns by user id
    let campaigns = await Campaign.find({ userId: userId }).populate(
      "usersDonated"
    );
    return apiRsposnses.successResponseWithData(
      res,
      "all campaigns by user id",
      campaigns
    );
  } catch (err) {
    return apiRsposnses.errorResponse(res, err);
  }
};

// donate to campaign
exports.donateToCampaign = async (req, res) => {
  try {
    // get campaign id from body
    let { campaignId } = req.body;
    // get campaign from db by id
    let campaign = await Campaign.findById(campaignId)
      .populate("usersDonated")
      .populate("userId");
    // check if campaign is not null
    if (campaign) {
      // get user id from body
      let userId = req.user;
      // get user from db by id
      let user = await User.findById(userId);
      // check if user is not null
      if (user) {
        // get donation amount from body
        let { donationAmount } = req.body;
        // check if donation amount is greater than 0
        if (donationAmount > 0) {
          // add donation amount to campaign amount
          // add donation amount to campaign collected amount as integer
          donationAmount = parseInt(donationAmount);
          campaign.collectedAmount += donationAmount;
          campaign.remainingAmount -= donationAmount;
          // check if campaign is completed
          if (campaign.remainingAmount <= 0) {
            // set campaign to completed
            campaign.isCompleted = true;
            campaign.isInProgress = false;
            // set campaign to inactive
            campaign.isActive = false;
          }

          // add user id to users donated array

          // save campaign to db
          // check the user has donated to this campaign before
          let hasDonatedBefore = false;
          for (let i = 0; i < user.totalCampaignsDonated.length; i++) {
            if (user.totalCampaignsDonated[i] == campaignId) {
              hasDonatedBefore = true;
              break;
            }
          }
          // if user has not donated to this campaign before
          if (!hasDonatedBefore) {
            // add campaign id to user campaigns donated array
            user.totalCampaignsDonated.push(campaignId);
            campaign.usersDonated.push(user);
            campaign.noOfUserDonated += 1;
          }

          // add donation amount to user balance
          user.totalAmountDonated += donationAmount;
          // save user to db
          user = await user.save();
          campaign = await campaign.save();
          return apiRsposnses.successResponseWithData(
            res,
            "donated to campaign",
            campaign
          );
        } else {
          return apiRsposnses.errorResponse(res, "invalid donation amount");
        }
      }
    } else {
      return apiRsposnses.errorResponse(res, "campaign not found");
    }
  } catch (err) {
    console.log(err);
    return apiRsposnses.errorResponse(res, "err");
  }
};

//  get all new campaigns
exports.getAllNewCampaigns = async (req, res) => {
  try {
    // get all new campaigns
    let campaigns = await Campaign.find({
      isActive: false,
      isApproved: false,
      isRejected: false,
      isCompleted: false,
    }).populate("userId");
    return campaigns;
  } catch (err) {
    return apiRsposnses.errorResponse(res, err);
  }
};

// mark campaign as completed, incomplete, active, inactive
exports.markCampaignCompleted = async (campaignId) => {
  try {
    // get campaign from db by id
    let campaign = await Campaign.findById(campaignId);
    // check if campaign is not null
    if (campaign) {
      // check if campaign is completed
      campaign.isCompleted = true;
      campaign.isInProgress = false;
      // set campaign to inactive
      campaign.isActive = false;
      // save campaign to db
      campaign = await campaign.save();
      return campaign;
    }
  } catch (err) {
    throw err;
  }
};
// mark as incomplete
exports.markCampaignAsIncomplete = async (campaignId) => {
  try {
    // get campaign from db by id
    let campaign = await Campaign.findById(campaignId);
    // check if campaign is not null
    if (campaign) {
      // check if campaign is completed
      campaign.isCompleted = false;
      campaign.isInProgress = true;
      // set campaign to inactive
      campaign.isActive = true;
      // save campaign to db
      campaign = await campaign.save();
      return campaign;
    }
  } catch (err) {
    throw err;
  }
};
// mark as active
exports.markCampaignAsActive = async (campaignId) => {
  try {
    // get campaign from db by id
    let campaign = await Campaign.findById(campaignId);
    // check if campaign is not null
    if (campaign) {
      // check if campaign is completed
      campaign.isCompleted = false;
      campaign.isInProgress = true;
      // set campaign to inactive
      campaign.isActive = true;
      // save campaign to db
      campaign = await campaign.save();
      return campaign;
    }
  } catch (err) {
    throw err;
  }
};
// mark as inactive
exports.markCampaignAsInactive = async (campaignId) => {
  try {
    // get campaign from db by id
    let campaign = await Campaign.findById(campaignId);
    // check if campaign is not null
    if (campaign) {
      // check if campaign is completed
      campaign.isCompleted = false;
      campaign.isInProgress = false;
      // set campaign to inactive
      campaign.isActive = false;
      // save campaign to db
      campaign = await campaign.save();
      return campaign;
    }
  } catch (err) {
    throw err;
  }
};
