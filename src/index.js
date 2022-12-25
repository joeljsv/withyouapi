const express = require("express");
const router = express.Router();
const user = require("./controllers/user");
const campaign = require("./controllers/campaign");
const biStander = require("./controllers/biStander");
const verifyTokenUser = require("./helpers/auth_midd").verifyTokenUser;
const saltedMd5 = require("salted-md5");
var admin = require("firebase-admin");

var serviceAccount = require("./key.json");
const multer = require("multer");

require("dotenv").config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://withyouapi-893be.firebaseio.com",
  storageBucket: process.env.BUCKET_URL,
});

const upload = multer({ storage: multer.memoryStorage() });

// uplod function
uplofFile = async (req, res, next) => {
  try{

  if (!req.files) {
    res.status(400).send("No files were uploaded.");
    return;
  }
  // get file with feild name
  let bucket = admin.storage().bucket();
  let name = saltedMd5(req.files[0].originalname, "SUPER-S@LT!");
  let fileName = "images"+name + req.files[0].originalname;
  await bucket.file(fileName).createWriteStream().end(req.files[0].buffer);
  req.imag=process.env.BUCKET_PUBLIC_URL+fileName+"?alt=media";
  name = saltedMd5(req.files[1].originalname, "SUPER-S@LT!");
  fileName = "docu"+name + req.files[1].originalname;
  await bucket.file(fileName).createWriteStream().end(req.files[1].buffer);
  req.doc=process.env.BUCKET_PUBLIC_URL+fileName+"?alt=media";
  next();
  }catch(err){
    res.status(400).send("An Error Occured");
    return;
  }
};

// router.get("/items/:id",product.getProductById);
router.post("/login", user.login);
router.post("/signup", user.signup);
router.post(
  "/newcampaign",
  upload.any(),
  uplofFile,
  verifyTokenUser,
  campaign.createCampaign
);
router.get("/allcampaigns", campaign.getAllActiveCampaigns);
// donation
router.post("/donate", verifyTokenUser, campaign.donateToCampaign);
// new bistander
router.post("/newbistander", verifyTokenUser, biStander.createBiStander);
// get all bistanders
router.get("/allbistanders", biStander.getVerifiedAndUnexpiredBiStanders);
// join bistander
router.post("/joinbistander", verifyTokenUser, biStander.joinBiStander);
// remove bistander
router.post("/removebistander", verifyTokenUser, biStander.removeBiStanderUser);
router.get("/profile", verifyTokenUser, user.profile);
router.get("/bistandlistbyme", verifyTokenUser, biStander.getBiStanderListByUserId);
router.get("/campgibbyuserid", verifyTokenUser, campaign.getCampaignsByUserId);
router.get("/joinedme",verifyTokenUser, biStander.getJoinedBiStanderListByUserId);

module.exports = router;
