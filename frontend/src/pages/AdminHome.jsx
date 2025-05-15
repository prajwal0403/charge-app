import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { getPlaceholderImage } from '../common';
import toast from 'react-hot-toast';
import MapView from '../components/MapView';

const AdminHome = () => {
  const user = useSelector((state) => state.auth.user);
  const [stations, setStations] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [powerFilter, setPowerFilter] = useState('');
  const [connectorFilter, setConnectorFilter] = useState('All');
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const fetchAdminStations = async () => {
      try {
        const res = await api.get(`/charging-stations?admin=${user.email}`);
        setStations(res.data);
      } catch (err) {
        console.error('Failed to fetch charging-stations', err);
      }
    };

    fetchAdminStations();
  }, [user.email, user.id]);

  const handleDelete = async (stationId) => {
    try {
      await api.delete(`/charging-stations/${stationId}`);
      setStations(stations.filter((station) => station.id !== stationId));
      toast.success('Station deleted successfully!');
    } catch (err) {
      console.error('Failed to delete station', err);
      toast.error(err.response?.data?.message || "Unable to delete station");
    }
  };

  const filteredStations = stations.filter(station => {
    return (
      (statusFilter === 'All' || station.status === statusFilter) &&
      (powerFilter === '' || station.powerOutput >= Number(powerFilter)) &&
      (connectorFilter === 'All' || station.connectorType === connectorFilter)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Charging Stations Management</h1>

      {/* Filters Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Power Output Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Power Output (kW)</label>
            <input
              type="number"
              value={powerFilter}
              onChange={(e) => setPowerFilter(e.target.value)}
              placeholder="Enter min kW"
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Connector Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Connector Type</label>
            <select
              value={connectorFilter}
              onChange={(e) => setConnectorFilter(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="All">All Connectors</option>
              <option value="AC">AC</option>
              <option value="DC">DC</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between mb-6">
      <div className="flex gap-4">
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded-lg cursor-pointer ${
            viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setViewMode('map')}
          className={`px-4 py-2 cursor-pointer rounded-lg ${
            viewMode === 'map' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Map View
        </button>
      </div>
      <Link
        to="/create-station"
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        Add New Station
      </Link>
    </div>

     {viewMode === 'map' ? (
      <MapView stations={filteredStations} />
    ) : (
      <>
      {filteredStations.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No stations found matching the filters
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <div key={station.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={getPlaceholderImage(station.name)}
              alt={station.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{station.name}</h2>
              <span className={`text-sm px-2 py-1 rounded-full ${
                station.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {station.status}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
              <span>{station.latitude}, {station.longitude}</span>
            </div>
            
            <div className="flex items-center gap-2">
             <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
              <span>{station.powerOutput} kW</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
              <span>{station.connectorType}</span>
            </div>
          </div>

           <Link
                   to={`/station/${station.id}`}
                   className="mt-4 inline-block w-full text-center bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
                 >
                   View Station Details
                 </Link>
          <div className="mt-6 flex justify-end items-center">
            <div className="flex gap-4">
              <Link
                to={`/edit-station/${station.id}`}
                className="text-yellow-600 hover:text-yellow-800 flex items-center gap-2"
              >
                <span>Edit</span>
              </Link>
              <button
                onClick={() => handleDelete(station.id)}
                className="text-red-600 cursor-pointer hover:text-red-800 flex items-center gap-2"
              >
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
          ))}
        </div>
      )}
      </>
    )}

    </div>
  );
};

export default AdminHome;
