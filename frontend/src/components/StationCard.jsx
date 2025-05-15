import React from 'react';
import { Link } from 'react-router-dom';
import { getPlaceholderImage } from '../common';

const StationCard = ({ station }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={getPlaceholderImage(station.name)}
          alt={station.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">{station.name}</h2>
          <span className={`text-sm px-3  py-1.5 rounded-full ${
            station.status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {station.status}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-600">
            {station.latitude}, {station.longitude}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-gray-600">
            {station.powerOutput} kW
          </span>
        </div>

        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-gray-600">
            {station.connectorType}
          </span>
        </div>
      </div>

      <Link
        to={`/station/${station.id}`}
        className="mt-4 inline-block w-full text-center bg-blue-100 text-blue-800 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
      >
        View Station Details
      </Link>
    </div>
  );
};

export default StationCard;