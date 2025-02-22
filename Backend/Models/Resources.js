
import { Schema, model } from "mongoose";

const resourceRequestSchema = new Schema({
  resourceType: { type: String, required: true },
  quantity: { type: Number, required: true },
  priority: { type: String, default: "Medium" },
  location: { type: String, required: true },
  specificNeeds: { type: String },
  additionalNotes: { type: String },
  requestedAt: { type: Date, default: Date.now }
});

export default model("ResourceRequest", resourceRequestSchema);
