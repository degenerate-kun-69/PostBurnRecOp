import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VolunteerForm = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ Added isSubmitting state

  const [volunteer, setVolunteer] = useState({
    name: "",
    email: "",
    phone: "",
    skills: "",
    availability: ""
  });

  const handleVolunteerChange = (e) => {
    setVolunteer({ ...volunteer, [e.target.name]: e.target.value });
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // ✅ Prevent multiple submissions

    try {
      const response = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteer),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        throw new Error("Invalid JSON response from server");
      }

      if (response.ok) {
        toast.success("🎉 Registration Successful!", { position: "top-center" });
        setVolunteer({ name: "", email: "", phone: "", skills: "", availability: "" });
      } else {
        toast.error(`❌ Error: ${data.error || "Unknown error"}`, { position: "top-center" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("❌ Submission Failed! Please try again.", { position: "top-center" });
    } finally {
      setIsSubmitting(false); // ✅ Enable button after submission
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* ✅ Fixed "Back" button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        disabled={isSubmitting}
      >
        ← Back
      </button>

      <div className="container mx-auto p-6 flex flex-col items-center">
        <ToastContainer autoClose={3000} />
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Volunteer Registration</h2>
        <div className="mb-6 p-6 border rounded-lg shadow-lg bg-white w-full max-w-md">
          <form onSubmit={handleVolunteerSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" value={volunteer.name} onChange={handleVolunteerChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="email" name="email" placeholder="Email" value={volunteer.email} onChange={handleVolunteerChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="phone" placeholder="Phone Number" value={volunteer.phone} onChange={handleVolunteerChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="skills" placeholder="Skills (e.g., First Aid, Rescue)" value={volunteer.skills} onChange={handleVolunteerChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" name="availability" placeholder="Availability (e.g., Weekends)" value={volunteer.availability} onChange={handleVolunteerChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            
            {/* ✅ Fixed Submit Button with Loading State */}
            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VolunteerForm;
