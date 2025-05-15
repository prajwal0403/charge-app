import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-red-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center text-2xl font-bold text-white">
            <span className="mr-2">⚡</span> Charge App
          </Link>

          <div className="hidden md:flex items-center space-x-6">
          <Link
            to={user?.role === 'admin' ? '/admin-home' : '/'}
            className="text-white text-xl"
          >
            Home
          </Link>

            {!user ? (
              <>
                <Link to="/login" className="text-white text-xl">Login</Link>
                <Link to="/signup" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50">Sign Up</Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-white text-xl cursor-pointer focus:outline-none"
                >
                  {user.firstname} {user.lastname} 
                </button>

                {dropdownOpen && (
                  <div className="cursor-pointer absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10">
                    <button
                      onClick={handleLogout}
                      className="cursor-pointer block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
