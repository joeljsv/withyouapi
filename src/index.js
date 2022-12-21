const express = require('express');
const router = express.Router();
const user= require("./controllers/user");
const campaign = require("./controllers/campaign");
const biStander = require("./controllers/biStander");
const verifyTokenUser = require("./helpers/auth_midd").verifyTokenUser;
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.fieldname=="document"){
      cb(null, __dirname+'/temp/documents')
    }
    else if(file.fieldname=="images"){
    cb(null, __dirname+'/temp/images')}
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let filename=file.fieldname + '-' + uniqueSuffix+file.originalname.replace(" ","")
    if(file.fieldname=="document"){
        req.doc="temp/document/"+filename
      cb(null, filename)
    }
    else if(file.fieldname=="images"){
        req.imag="temp/images/"+filename
    cb(null, filename)}
    
  }
})

const upload = multer({ storage: storage })

// router.get("/items/:id",product.getProductById);
router.post("/login",user.login);
router.post("/signup",user.signup);
router.post("/newcampaign",upload.any(),verifyTokenUser,campaign.createCampaign);
router.get("/allcampaigns",campaign.getAllActiveCampaigns);
// donation
router.post("/donate",verifyTokenUser,campaign.donateToCampaign);
// new bistander 
router.post("/newbistander",verifyTokenUser,biStander.createBiStander);
// get all bistanders
router.get("/allbistanders",biStander.getVerifiedAndUnexpiredBiStanders);
// join bistander
router.post("/joinbistander",verifyTokenUser,biStander.joinBiStander);
// remove bistander
router.post("/removebistander",verifyTokenUser,biStander.removeBiStanderUser);







module.exports = router;
