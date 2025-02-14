import { Router } from "express";

const Alertsrouter = Router();
const alerts = [
    { id: 1, type: 'Earthquake', location: 'California', severity: 'High' },
    { id: 2, type: 'Flood', location: 'India', severity: 'Moderate' },
    { id: 3, type: 'Wildfire', location: 'Australia', severity: 'Severe' }
];

// GET /alerts - Fetch real-time disaster alerts
Alertsrouter.get('/alerts', async (req, res) => {
    try {
        res.json({ success: true, alerts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching alerts' });
    }
});

// GET /alerts/:id - Fetch details of a specific disaster alert
Alertsrouter.get('/alerts/:id', async (req, res) => {
    try {
        const alertId = parseInt(req.params.id);
        const alert = alerts.find(a => a.id === alertId);
        if (!alert) {
            return res.status(404).json({ success: false, message: 'Alert not found' });
        }
        res.json({ success: true, alert });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching alert details' });
    }
});

export default Alertsrouter;
