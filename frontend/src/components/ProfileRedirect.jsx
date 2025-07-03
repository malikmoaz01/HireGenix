import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from 'lucide-react';

const ProfileRedirect = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    checkUserRole();
  }, []);

  const checkUserRole = async () => {
    try {
      // Get token from memory/state instead of localStorage
      const token = window.sessionToken || localStorage?.getItem('token');
      
      if (!token) {
        // If no token, redirect to login
        setError(true);
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const role = data.user?.role;
        setUserRole(role);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner while checking role
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // If error or no token, redirect to login
  if (error) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on user role
  if (userRole === 'company') {
    console.log("Redirecting to company dashboard...");
    return <Navigate to="/company_dashboard" replace />;
  } else if (userRole === 'jobseeker') {
    return <Navigate to="/jobseeker-profile" replace />;
  } else {
    // If role is undefined or unknown, redirect to login
    return <Navigate to="/login" replace />;
  }
};

export default ProfileRedirect;