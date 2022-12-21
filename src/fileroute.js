const express = require('express');
const router = express.Router();


router.get("/document/:id",(req,res)=>{
    res.sendFile(__dirname+"/temp/documents/"+req.params.id)
});

router.get("/images/:id",(req,res)=>{
    res.sendFile(__dirname+"/temp/images/"+req.params.id)
}
);
module.exports = router;