import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
// import './index.css';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Signup from './pages/Signup';
import AdminHome from './pages/AdminHome';
import CustomerHome from './pages/Home';
import PrivateRoute from '../PrivateRoutes';
import ChargingStationForm from './pages/CreateChargingStation';
import StationDetails from './pages/StationDetails';

export default function App() {
  return (
    <>
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-home" element={<PrivateRoute role="admin" component={AdminHome} />} />
        <Route path="/customer-home" element={<PrivateRoute role="customer" component={CustomerHome} />} />
        <Route path="/station/:id" element={<StationDetails />} />
        <Route path="/create-station" element={<ChargingStationForm />} />
        <Route path="/edit-station/:id" element={<ChargingStationForm />} />
        {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
      </Routes>
    </>
  );
}
