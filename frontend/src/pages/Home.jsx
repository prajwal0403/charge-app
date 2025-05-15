import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import StationCard from '../components/ProductCard';
import MapView from '../components/MapView';

const CustomerHome = () => {
  const [stations, setStations] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [powerFilter, setPowerFilter] = useState('');
  const [connectorFilter, setConnectorFilter] = useState('All');
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const fetchAllStations = async () => {
      try {
        const res = await api.get('/charging-stations/all');
        setStations(res.data);
      } catch (err) {
        console.error('Failed to fetch stations', err);
      }
    };

    fetchAllStations();
  }, []);

  const filteredStations = stations.filter(station => {
    return (
      (statusFilter === 'All' || station.status === statusFilter) &&
      (powerFilter === '' || station.powerOutput >= Number(powerFilter)) &&
      (connectorFilter === 'All' || station.connectorType === connectorFilter)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">All Charging Stations</h1>

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

      {/* Stations Grid */}
       {viewMode === 'map' ? (
            <MapView stations={filteredStations} />
          ) : (<>  
      {filteredStations.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No stations found matching the filters
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStations.map((station) => (
            <div key={station.id} className="rounded-md p-4">
              <StationCard station={station} />
            </div>
          ))}
        </div>
      )}
      </>)}
    </div>
  );
};

export default CustomerHome;