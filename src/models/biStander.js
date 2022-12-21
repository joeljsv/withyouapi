const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const biStander = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientGender: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  causeOfAdmission: {
    type: String,
    required: true,
  },
  admissionDate: {
    type: String,
    required: true,
  },
  admissionTime: {
    type: String,
    required: true,
  },

  expectedDischargeDate: {
    type: String,
    required: true,
  },
  // lat and long of location
  // location: [
  //     {
  //         type: Number,
  //         required: true,
  //     },
  // ],
  location: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  locationAddress: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  noOfbiStanderReq: {
    type: Number,
    required: true,
  },
  joinedUsersCount: {
    type: Number,
    default: 0,
  },
  // List of joined users
  joinedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isrjected: {
    type: Boolean,
    default: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isExpired: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  
}, { timestamps: true });
module.exports = mongoose.model("biStander", biStander);
