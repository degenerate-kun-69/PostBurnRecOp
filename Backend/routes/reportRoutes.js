import { Router } from 'express';
import Report from '../Models/Report.js'; // Assuming you have a Mongoose model
const router = Router();

// @route   POST /api/reports
// @desc    Create a new incident report
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { title, location, description } = req.body;

        if (!title || !location || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newReport = new Report({ title, location, description });
        await newReport.save();

        res.status(201).json({ message: "Report submitted successfully", report: newReport });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// @route   GET /api/reports
// @desc    Fetch all incident reports
// @access  Public
router.get('/', async (req, res) => {
    try {
        const reports = await find().sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// @route   GET /api/reports/:id
// @desc    Fetch a single report
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const report = await findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// @route   PUT /api/reports/:id
// @desc    Update a report
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const { title, location, description } = req.body;

        const updatedReport = await findByIdAndUpdate(
            req.params.id,
            { title, location, description },
            { new: true }
        );

        if (!updatedReport) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json({ message: "Report updated successfully", report: updatedReport });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// @route   DELETE /api/reports/:id
// @desc    Delete a report
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const report = await findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        res.status(200).json({ message: "Report deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
