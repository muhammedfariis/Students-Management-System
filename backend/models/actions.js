import mongoose from "mongoose";

const actionSchema = new mongoose.Schema(
  {
    actionType: {
      type: String,
      enum: ["Suspension", "Dismissal"],
      required: true,
    },

    targetCategory: {
      type: String,
      required: true,
    },

    username: {
      type : String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authentications",
      required: true,
    },

    duration: {
      type: Number,
      default: null,
    },

    reason: {
      type: String,
      required: true,
    },

    effectiveDate: {
      type: Date,
      required: true,
    },

    issuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authentications",
    },

    status: {
      type: String,
      enum: ["Active", "Completed"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Action", actionSchema);