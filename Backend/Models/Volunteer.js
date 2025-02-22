import { Schema, model } from "mongoose";

const VolunteerSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  skills: { type: String, required: true },
  availability: { type: String, required: true },
});

const Volunteer = model("Volunteer", VolunteerSchema);

export default Volunteer;
