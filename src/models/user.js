// user model with mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  
phone: {

    type: String,
    required: true,
  },
  addresslin1: {
    type: String,
    required: true,
  },
  addresslin2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  totalAmountDonated: {
    type: Number,
    default: 0,
  },
  totalCampaignsDonated: [
    {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
    }
  ],
  joinedBiStander: [
    {
      type: Schema.Types.ObjectId,
      ref: "biStander",
    },
  ],
  
  role: {
    type: Number,
    default: 0,
  },
 
    
});
const User = mongoose.model("User", userSchema);
module.exports = User;
