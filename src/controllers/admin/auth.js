const User = require("../../models/user");
const apiResponses = require("../../helpers/apiResponse");




// admin login function
exports.login = async(req, res) => {
    try{
        // admin login
        let admin = await User.findOne({email:req.body.username});
        if(!admin){
            // render login page with error message hbs
            return res.render("login/login", {errors:["User not found"]});

        }
        if(admin.password!=req.body.password){
            // render login page with error message hbs
            return res.render("login/login", {errors:["Password is incorrect"]});
            
        }
        if(admin.role!=1){
            // render login page with error message hbs
            return res.render("login/login", {errors:["User is not admin"]});
        }

        // set session
        return res.redirect("/admin/dashboard");

    }catch(err){
        return apiResponses.errorResponse(res, err);



    }
    }


    // render login page
    exports.renderLogin = async(req, res) => {
        try{
            // render login page
            return res.render("login/login");
        }catch(err){
            return apiResponses.errorResponse(res, err);
        }
    }
