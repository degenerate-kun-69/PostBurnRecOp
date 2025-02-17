import React, { Suspense, lazy } from "react";
import Navbar from "../Components/NavBar.jsx";
import ChatBot from "../Components/ChatBot.jsx";
import DisasterAlert from "../Components/DisasterAlert.jsx";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-red-600">Something went wrong loading this component.</p>
          <button 
            onClick={() => this.setState({ hasError: false })}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-lg h-64"></div>
);

// Lazy load components
const MapApi = lazy(() => import("../Components/Map.jsx"));
const GeoChart = lazy(() => import("../Components/GeoChart.jsx"));

const DashBoard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
    

      <Navbar />
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Map Section */}
        <ErrorBoundary>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Geographic Map</h2>
            <Suspense fallback={<LoadingSkeleton />}>
              <MapApi />
            </Suspense>
          </div>
        </ErrorBoundary>

        {/* Geo Chart Section */}
        <ErrorBoundary>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Geographic Distribution</h2>
            <Suspense fallback={<LoadingSkeleton />}>
              <GeoChart />
            </Suspense>
          </div>
        </ErrorBoundary>
        <DisasterAlert/>
      </div>

      <ChatBot/>
          </div>
  );
};

export default DashBoard;