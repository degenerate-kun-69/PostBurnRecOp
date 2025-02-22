import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // ✅ Added success message state
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleBlur = useCallback((field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  }, []);

  const validateForm = () => {
    const errors = {};
    if (formData.title.length < 5) {
      errors.title = 'Title must be at least 5 characters';
    }
    if (formData.location.length < 3) {
      errors.location = 'Please enter a valid location';
    }
    if (formData.description.length < 20) {
      errors.description = 'Description must be at least 20 characters';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
        setError('Please fix the highlighted errors');
        setTouched({ title: true, location: true, description: true });
        return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccessMessage(''); // ✅ Reset success message

    try {
        const response = await fetch('http://localhost:5000/api/reports', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to submit report");
        }

        console.log('Report submitted:', data);
        setFormData({ title: '', location: '', description: '' });
        setTouched({});
        setSuccessMessage('Report submitted successfully! ✅'); // ✅ Set success message

        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);

    } catch (err) {
        setError(err.message);
    } finally {
        setIsSubmitting(false);
    }
};

  const errors = validateForm();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        disabled={isSubmitting}
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Report New Incident</h2>
          <p className="text-gray-600 mt-1">Please provide detailed information about the incident</p>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {successMessage && ( // ✅ Show success message
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Incident Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={() => handleBlur('title')}
                placeholder="E.g., Flood in Downtown Area"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors
                  ${touched.title && errors.title 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  }
                  ${isSubmitting ? 'bg-gray-100' : 'bg-white'}`}
              />
              {touched.title && errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                onBlur={() => handleBlur('location')}
                placeholder="Enter incident location"
                disabled={isSubmitting}
                className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors
                  ${touched.location && errors.location 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  }
                  ${isSubmitting ? 'bg-gray-100' : 'bg-white'}`}
              />
              {touched.location && errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={() => handleBlur('description')}
                placeholder="Provide detailed information about the incident"
                disabled={isSubmitting}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors
                  ${touched.description && errors.description 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                  }
                  ${isSubmitting ? 'bg-gray-100' : 'bg-white'}`}
              />
              {touched.description && errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg 
                hover:bg-blue-700 transition-colors
                disabled:bg-blue-400 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Report;
