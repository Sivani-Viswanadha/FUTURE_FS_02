const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, lowercase: true, trim: true, index: true },
    phone:     { type: String, trim: true },
    company:   { type: String, trim: true, index: true },
    jobTitle:  { type: String, trim: true },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Proposal", "Won", "Lost"],
      default: "New",
      index: true,
    },
    source: {
      type: String,
      enum: ["Website", "Referral", "LinkedIn", "Email", "Cold Call", "Event", "Other"],
      default: "Other",
    },
    industry: { type: String, trim: true },
    notes:    { type: String, trim: true },
    lastContacted:    { type: Date },
    followUpDate:     { type: Date },
    owner:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    tags:     [{ type: String, trim: true }],
    dealValue: { type: Number, default: 0, min: 0 },
    location:  { type: String, trim: true },
    preferredChannel: { type: String, enum: ["Email", "Phone", "WhatsApp", "LinkedIn"], default: "Email" },
  },
  { timestamps: true }
);

leadSchema.index({ firstName: "text", lastName: "text", email: "text", company: "text" });

module.exports = mongoose.model("Lead", leadSchema);
