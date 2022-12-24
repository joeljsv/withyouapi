const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  patientName: {
    type: String,
    required: true,
  },
  patientAge: {
    type: Number,
    required: true,
  },
  patientGender: {
    type: String,
    required: true,
  },
  patientAdhaar: {
    type: String,
    required: true,
  },
  patientRationCardNumber: {
    type: String,
    required: true,
  },
  patientRationCardType: {
    type: String,
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  hospitalAddress: {
    type: String,
    required: true,
  },
  isGovHospital: {
    type: Boolean,
    required: true,
  },
  hospitalContact: {
    type: String,
    required: true,
  },

  // location: {
  //   lat: {
  //     type: Number,
  //     required: true,
  //   },
  //   long: {
  //     type: Number,
  //     required: true,
  //   },
  // },
  homeAddress: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  documents: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },

  targetAmount: {
    type: Number,
    required: true,
  },
  collectedAmount: {
    type: Number,
    default: 0,
  },
  remainingAmount: {
    type: Number,
    default: 0,
  },
  upiID: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default:false,
  },
  isApproved: {
    type: Boolean,
    default:false,
  },
  isRejected: {
    type: Boolean,
    default:false,
  },
  isCompleted: {
    type: Boolean,
   default:false,
  },

  noOfUserDonated: {
    type: Number,
    default:0,
  },
  usersDonated: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  isInProgress: {
    type: Boolean,
    default: true,
  },
},{
  timestamps: true,
}
);

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
