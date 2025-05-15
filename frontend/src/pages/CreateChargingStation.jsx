import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ChargingStationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams()
  const initialData = {
    name: '',
    latitude: '',
    longitude: '',
    status: 'Active',
    powerOutput: '',
    connectorType: 'AC'
};

const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (id) {
      // Fetch product details for editing if there's an ID in the URL
      const fetchStationDetails = async () => {
        try {
          const response = await api.get(`/charging-stations/${id}`);
          setFormData(response.data);
        } catch (err) {
          console.error('Error fetching station details:', err);
        }
      };

      fetchStationDetails();
    }
  }, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'powerOutput' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        // Edit product
        await api.put(`/charging-stations/${id}`, {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    });
        toast.success('Station updated successfully!');
      } else {
        // Create new product
        await api.post('/charging-stations', {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    });
        toast.success('Station created successfully!');
      }

      navigate('/admin-home'); // Redirect to admin home page
    } catch (err) {
      console.error('Error submitting form:', err);
      toast.error('Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">
        {id ? 'Edit Charging Station' : 'Create New Charging Station'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-lg">
        
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Station Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Location Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              step="0.00000001"
              min="-90"
              max="90"
              value={formData.latitude}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              step="0.00000001"
              min="-180"
              max="180"
              value={formData.longitude}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Status Field */}
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Power Output Field */}
        <div className="mb-4">
          <label htmlFor="powerOutput" className="block text-sm font-medium text-gray-700">
            Power Output (kW)
          </label>
          <input
            type="number"
            id="powerOutput"
            name="powerOutput"
            step="0.1"
            min="0"
            value={formData.powerOutput}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Connector Type Field */}
        <div className="mb-6">
          <label htmlFor="connectorType" className="block text-sm font-medium text-gray-700">
            Connector Type
          </label>
          <select
            id="connectorType"
            name="connectorType"
            value={formData.connectorType}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="AC">AC</option>
            <option value="DC">DC</option>
          </select>
        </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center items-center gap-2 cursor-pointer py-2 bg-gradient-to-r from-blue-600 to-red-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 disabled:opacity-50"
      >
        {loading ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        ) : (
          id ? 'Update Station' : 'Create Station'
        )}
      </button>
      </form>
    </div>
  );
};

export default ChargingStationForm;