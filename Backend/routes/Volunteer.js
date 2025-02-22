import { Router } from "express";
import { registerVolunteer, getVolunteers } from "../Controllers/VolunteerController.js";

const Volunteer = Router();

Volunteer.post("/", registerVolunteer);
Volunteer.get("/", getVolunteers);

export default Volunteer;
