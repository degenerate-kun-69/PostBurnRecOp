import { Router } from "express";
import ResourceRequest from "../Models/Resources.js"; // ✅ Ensure correct import

const Resources = Router();

// Create a new resource request
Resources.post("/", async (req, res) => {
  try {
    const newRequest = new ResourceRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: "Resource request submitted successfully!", request: newRequest });
  } catch (error) {
    res.status(500).json({ error: "Failed to submit resource request", details: error.message });
  }
});

// Get all resource requests
Resources.get("/", async (req, res) => {
  try {
    const requests = await ResourceRequest.find(); // ✅ Fixed: Use model reference
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve resource requests", details: error.message });
  }
});

// Get a single request by ID
Resources.get("/:id", async (req, res) => {
  try {
    const request = await ResourceRequest.findById(req.params.id); // ✅ Fixed: Use model reference
    if (!request) return res.status(404).json({ error: "Request not found" });
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Error fetching the request", details: error.message });
  }
});

// Delete a resource request
Resources.delete("/:id", async (req, res) => {
  try {
    const request = await ResourceRequest.findByIdAndDelete(req.params.id); // ✅ Fixed: Use model reference
    if (!request) return res.status(404).json({ error: "Request not found" });
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting the request", details: error.message });
  }
});

export default Resources;
