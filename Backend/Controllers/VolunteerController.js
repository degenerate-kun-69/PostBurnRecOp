import Volunteer from "../Models/Volunteer.js";

// @desc   Register a new volunteer
// @route  POST /api/volunteers
const registerVolunteer = async (req, res) => {
  try {
    const { name, email, phone, skills, availability } = req.body;
    const newVolunteer = new Volunteer({ name, email, phone, skills, availability });

    await newVolunteer.save();
    res.status(201).json({ message: "Volunteer registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error registering volunteer" });
  }
};

// @desc   Get all volunteers
// @route  GET /api/volunteers
const getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching volunteers" });
  }
};

export { registerVolunteer, getVolunteers };
