import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"; // Import Axios
import "react-toastify/dist/ReactToastify.css";

const ResourceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resourceType: "",
    quantity: "",
    priority: "Medium",
    location: "",
    specificNeeds: "",
    additionalNotes: "",
  });

  const [loading, setLoading] = useState(false);

  const resourceOptions = [
    "Food", "Drinking Water", "Medical Supplies", "Shelter", "Clothing",
    "Rescue Equipment", "Fuel", "Sanitation Supplies", "First Aid Kits",
    "Generators", "Communication Devices", "Volunteers", "Transportation",
    "Power Supply Assistance"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/resources", formData, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Resource request submitted successfully! 🎉");

      setFormData({
        resourceType: "",
        quantity: "",
        priority: "Medium",
        location: "",
        specificNeeds: "",
        additionalNotes: "",
      });

    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside the 2xx range
        toast.error(`Error: ${error.response.data.error || "Submission failed."}`);
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from server. Check your connection.");
      } else {
        // Something else caused an error
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold mb-4">Disaster Resource Requirement Form</h2>
      <p className="text-sm text-gray-600 mb-4">
        Please fill out the form below to request necessary resources for disaster relief.
        Ensure accuracy to expedite assistance.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">
            Resource Type <span className="text-red-500">*</span>
          </label>
          <select
            name="resourceType"
            value={formData.resourceType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a resource</option>
            {resourceOptions.map((resource, index) => (
              <option key={index} value={resource}>{resource}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter the required quantity"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Priority Level</label>
          <select
            name="priority"
            value={formData.priority} 
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="High">High - Immediate Need</option>
            <option value="Medium">Medium - Required Soon</option>
            <option value="Low">Low - Non-Urgent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Provide an exact location or nearest landmark"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Specific Needs</label>
          <input
            type="text"
            name="specificNeeds"
            value={formData.specificNeeds}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Specify additional needs (e.g., baby formula, medicine, blankets)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Any extra details that might help in fulfilling the request"
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            disabled={loading}
          >
            Back
          </button>

          <button
            type="submit"
            className={`p-2 text-white rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Resource Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceForm;
