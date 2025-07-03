// CompanyLayout.jsx
import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import CompanyDashboardSidebar from './CompanyDashboardSidebar';

const CompanyLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleRouteChange = (path) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CompanyDashboardSidebar 
        activeRoute={location.pathname} 
        onRouteChange={handleRouteChange}
      />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default CompanyLayout;
