const express = require('express');
const router = express.Router();
const admin = require("./controllers/admin/auth");
const dashboard = require("./controllers/admin/dashboard");
const campaign = require("./controllers/admin/campgin-admin");
const biStander = require("./controllers/admin/biStander-admin");

// admin login
router.post("/login",admin.login);
// login page
router.get("/login",admin.renderLogin);
// admin dashboard
router.get("/dashboard",dashboard.renderDashbord);
router.get("/approved",dashboard.renderApprovedCampaigns);
router.get("/rejected",dashboard.renderRejectedCampaigns);



// capgingn
// show all details of a campaign by id
router.get("/campaign/:campaignId",campaign.showCampaignDetails);
// campigns  approval reject and complete
router.get("/campaign/approve/:campaignId",campaign.approveCampaign);
router.get("/campaign/reject/:campaignId",campaign.rejectCampaign);
router.get("/campaign/complete/:campaignId",campaign.completeCampaign);
// campigns  active inactive and incomplete
router.get("/campaign/active/:campaignId",campaign.activeCampaign);
router.get("/campaign/inactive/:campaignId",campaign.inactiveCampaign);
router.get("/campaign/incomplete/:campaignId",campaign.incompleteCampaign);


// bistander details
router.get("/bistander/:biStanderId",biStander.showBiStanderDetails);
router.get("/bistander/approve/:biStanderId",biStander.approveBiStander);
router.get("/bistander/reject/:biStanderId",biStander.rejectBiStander);
router.get("/bistander/complete/:biStanderId",biStander.completeBiStander);
router.get("/bistander/incomplete/:biStanderId",biStander.incompleteBiStander);









module.exports = router;