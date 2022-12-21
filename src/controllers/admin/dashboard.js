const User = require("../../models/user");
const Campaign = require("../../models/campaign");
const BiStander = require("../../models/biStander");
const campaignController = require("../campaign");
const bistanderController = require("../biStander");

// render dash bord
exports.renderDashbord = async (req, res) => {
  try {
    // get all campaigns
    let campaigns = await campaignController.getAllNewCampaigns();
    let biStanderCampaigns = await bistanderController.newBiStanderRequest();
    

    // render dashbord page
    // create js list of objects to pass to dashbord page
   let campaignsList = campginMapObject(campaigns);
    let biStanderCampaignsList = biStanderMapObject(biStanderCampaigns);

    res.render("admin/home", {
      campaigns: campaignsList,
      biStanderCampaigns: biStanderCampaignsList,
    });
  } catch (err) {
    return  res.status(500).json("Error: " + err);
  }
};
// all approved campaigns and biStander
exports.renderApprovedCampaigns = async (req, res) => {
  try {
    console.log("renderApprovedCampaigns");
    // get all campaigns
    let campaigns = await campaignController.getAllApprovedCampaigns(req, res);
    let biStanderCampaigns = await bistanderController.getVerifiedBiStanders(req, res);
    console.log("renderApprovedCampaigns");
    // render dashbord page
    // create js list of objects to pass to dashbord page
    let campaignsList = campginMapObject(campaigns);
    let biStanderCampaignsList = biStanderMapObject(biStanderCampaigns);

    res.render("admin/home", {
      campaigns: campaignsList,
      biStanderCampaigns: biStanderCampaignsList,
    });
  } catch (err) {
    console.log(err);
    return  res.status(500).json("Error: " + err);
  }
};
// all rejected campaigns and biStander
exports.renderRejectedCampaigns = async (req, res) => {
  try {
    // get all campaigns
    let campaigns = await campaignController.getAllRejectedCampaigns(req, res);
    let biStanderCampaigns = await bistanderController.rejectedBiStanderRequest(req, res);
    // render dashbord page
    // create js list of objects to pass to dashbord page
    let campaignsList = campginMapObject(campaigns);
    let biStanderCampaignsList = biStanderMapObject(biStanderCampaigns);
    
    res.render("admin/home", {
      campaigns: campaignsList,
      biStanderCampaigns: biStanderCampaignsList,
    });
  } catch (err) {
    return  res.status(500).json("Error: " + err);
  }
};


// campigns map object
function campginMapObject(campaign) {
  let campaignsList = [];
  let inse = 1;
  campaign.forEach((campaign) => {
    let campaignObj = {
      sl: inse++,
      id: campaign._id,
      title: campaign.title,
      targetAmount: campaign.targetAmount,
      raisedAmount: campaign.collectedAmount,
      type: campaign.type,
      patientName: campaign.patientName,
       postedBy: campaign.userId.name,
      relation: campaign.relation
    };
    campaignsList.push(campaignObj);
  });
  return campaignsList;
}

// biStander map object
function biStanderMapObject(biStander) {
  let biStanderList = [];
  let inse = 1;
  biStander.forEach((biStander) => {
    let biStanderObj = {
      sl: inse++,
      id: biStander._id,
      patientName: biStander.patientName,
      postedBy: biStander.userId.name,
      relation: biStander.relation,
      causeOfAdmission: biStander.causeOfAdmission,
      admissionDate: biStander.admissionDate,
      noOfbiStanderReq: biStander.noOfbiStanderReq,
      joinedUsersCount: biStander.joinedUsersCount,
    };
    biStanderList.push(biStanderObj);
  });
  return biStanderList;
}
