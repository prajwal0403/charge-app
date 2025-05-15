import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { getPlaceholderImage } from "../common";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const StationDetails = () => {
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const res = await api.get(`/charging-stations/${id}`);
        setStation(res.data);
      } catch (err) {
        console.error("Failed to fetch charging station details:", err);
      }
    };

    fetchStation();
  }, [id, deleted]);

  const toggleDeleted = () => {
    setDeleted(!deleted);
  };

  const handleDelete = async (stationId) => {
    try {
      setLoading(true);
      await api.delete(`/charging-stations/${stationId}`);
      toggleDeleted();
      toast.success("Station deleted successfully!");
      navigate("/admin-home");
    } catch (err) {
      console.error("Failed to delete station", err);
      toast.error(err.response?.data?.message || "unable to delete station");
    } finally {
      setLoading(false);
    }
  };

  if (!station) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        Loading Station Details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-8 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={getPlaceholderImage(station.name)}
              alt={station.name}
              className="w-32 h-32 rounded-xl object-cover shadow-lg"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {station.name}
              </h1>
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  station.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {station.status}
              </span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Technical Specifications */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Technical Specifications
              </h2>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Location Coordinates
                  </h3>
                  <p className="mt-1 text-lg font-mono text-gray-900">
                    {station.latitude}, {station.longitude}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Power Output
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {station.powerOutput} kW
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Connector Type
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {station.connectorType}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Administration
              </h2>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Created By
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    Admin #{station.createdBy}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Date Created
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {new Date(station.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {user.role === "admin" && (
            <div className="mt-8 flex gap-4 justify-end border-t pt-6">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Link
                  to={`/edit-station/${station.id}`}
                  className="flex items-center gap-2"
                >
                  Edit Station
                </Link>
              </button>
              <button
                type="submit"
                disabled={loading}
                onClick={() => handleDelete(station.id)}
                className="flex px-3 justify-center items-center gap-2 cursor-pointer py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none transition duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  "Delete Station"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StationDetails;
